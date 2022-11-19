import * as React from "react";
import type { ActionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { z } from "zod";

import { requireUserId } from "~/session.server";
import { createProject } from "~/models/project.server";

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
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Title: </span>
          <input
            ref={titleRef}
            name="title"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={actionData?.errors?.title ? true : undefined}
            aria-errormessage={
              actionData?.errors?.title ? "title-error" : undefined
            }
          />
        </label>
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
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
        </label>
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  );
}
