import { z } from "zod";
import * as React from "react";
import { json, redirect } from "@remix-run/node";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import type {
  ActionArgs,
  LoaderArgs,
  MetaFunction,
  ErrorBoundaryComponent,
} from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";

import { createUserSession, getUserId } from "~/session.server";
import { verifyLogin } from "~/models/user.server";
import { safeRedirect } from "~/utils";
import InputErrorMessage from "~/lib/components/forms/InputErrorMessage";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = Object.fromEntries(await request.formData());

  const loginValidation = z.object({
    email: z.string().email({ message: "Email is invalid" }),
    password: z
      .string()
      .min(8, { message: "Password must include at least 8 characters" }),
    redirectTo: z.string().optional(),
    remember: z.string().optional(),
  });

  let validFormData;

  try {
    validFormData = await loginValidation.parse(formData);
  } catch (e: any) {
    // Invalid form data passed
    type LoginFormErrors = {
      email?: string;
      password?: string;
      redirectTo?: string;
      remember?: string;
    };

    let errors: LoginFormErrors = {};

    e?.issues.forEach((issue: any) => {
      errors = {
        ...errors,
        [issue.path[0]]: issue.message,
      };
    });

    return json({
      status: 400,
      errors,
      formData,
    });
  }

  const { email, password, redirectTo, remember } = validFormData;
  const safeRedirectTo = safeRedirect(redirectTo, "/dashboard");

  const user = await verifyLogin(email, password);

  if (!user) {
    return json(
      { errors: { email: "Invalid email or password", password: null } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo: safeRedirectTo,
  });
}

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard/projects";
  const actionData = useActionData<typeof action>();
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=white"
            alt="Arraknid"
          />
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Sign in to your account
          </h2>
        </div>
        <Form method="post" className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div>
                <input
                  ref={emailRef}
                  id="email"
                  required
                  autoFocus={true}
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={actionData?.errors?.email ? true : undefined}
                  aria-describedby="email-error"
                  className="relative block w-full appearance-none rounded-none rounded-t-md px-3 py-2 text-zinc-900 placeholder-zinc-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                {actionData?.errors?.email && (
                  <div id="email-error">
                    <InputErrorMessage message={actionData.errors.email} />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div>
                <input
                  id="password"
                  ref={passwordRef}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={actionData?.errors?.password ? true : undefined}
                  aria-describedby="password-error"
                  className="relative block w-full appearance-none rounded-none rounded-b-md px-3 py-2 text-zinc-900 placeholder-zinc-500 focus:z-10  sm:text-sm"
                  placeholder="Password"
                />
                {actionData?.errors?.password && (
                  <div id="password-error">
                    <InputErrorMessage message={actionData.errors.password} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-red-400 focus:ring-zinc-900"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-zinc-100"
              >
                Remember me
              </label>
            </div>
            <div className="text-center text-sm text-zinc-300">
              Don't have an account?{" "}
              <Link
                className="text-zinc-100 underline transition hover:text-red-400"
                to={{
                  pathname: "/signup",
                  search: searchParams.toString(),
                }}
              >
                Sign up
              </Link>
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-white"
                aria-hidden="true"
              />
            </span>
            Log in
          </button>
        </Form>
      </div>
    </div>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return <div>ERROR: {error.message}</div>;
};
