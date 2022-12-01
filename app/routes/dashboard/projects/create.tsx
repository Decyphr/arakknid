import * as React from "react";
import type { ActionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { z } from "zod";

import { requireUserId } from "~/session.server";
import { createProject } from "~/models/project.server";
import { DocumentPlusIcon } from "@heroicons/react/20/solid";

export async function action({ request }: ActionArgs) {
  const userId = await requireUserId(request);

  // validate
  const formData = Object.fromEntries(await request.formData());
  const validationSchema = z.object({
    title: z
      .string()
      .min(3, { message: "Title must include at least 3 characters" }),
    description: z.string(),
  });

  try {
    const validatedForm = validationSchema.parse(formData);
    const { title, description } = validatedForm;
    const project = await createProject({
      title,
      description: description ? description : "",
      userId,
    });

    return redirect(`/dashboard/projects/${project.id}`);
  } catch (e: any) {
    // ZodError will store the field name under issue.path
    // const fields = e.issues.map((issue: any) => issue.path[0]);
    type ProjectFormErrors = {
      title?: string;
      description?: string;
    };

    let errors: ProjectFormErrors = {};

    e.issues.forEach((issue: any) => {
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
}

export default function NewProjectPage() {
  const actionData = useActionData<typeof action>();
  const titleRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Form method="post" className="mt-5 md:col-span-2 md:mt-0">
      <div className="m-auto max-w-5xl rounded bg-white p-8 shadow">
        <h2 className="mb-8 border-b pb-4 text-2xl font-bold">
          <span className="mr-4 inline-block">
            <DocumentPlusIcon className="m-auto h-6 w-6" />
          </span>
          Create a New Project
        </h2>
        <div>
          <label
            htmlFor="title"
            className="text-md block font-medium text-gray-700"
          >
            Project Title
          </label>
          <input
            ref={titleRef}
            name="title"
            className="mt-1 block w-full rounded-md border-2 border-indigo-500 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            aria-invalid={actionData?.errors?.title ? true : undefined}
            aria-errormessage={
              actionData?.errors?.title ? "title-error" : undefined
            }
          />
          {actionData?.errors?.title && (
            <div className="pt-1 text-xs text-red-700" id="title-error">
              <em>{actionData?.errors?.title}</em>
            </div>
          )}
        </div>

        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Description: </span>
            <input
              name="description"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </label>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </Form>
  );
}
