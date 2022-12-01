import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useParams } from "@remix-run/react";
import { z } from "zod";
import { createTicket } from "~/models/ticket.server";

export async function action({ request }: ActionArgs) {
  // validate
  const formData = Object.fromEntries(await request.formData());
  const validationSchema = z.object({
    summary: z
      .string()
      .min(3, { message: "Please provide a summary of at least 3 characters" }),
    projectId: z.string().min(1),
  });

  try {
    const validatedForm = validationSchema.parse(formData);
    const { summary, projectId } = validatedForm;
    const ticket = await createTicket({
      summary,
      projectId,
    });

    return redirect(`/dashboard/projects/${projectId}`);
  } catch (e: any) {
    // ZodError will store the field name under issue.path
    // const fields = e.issues.map((issue: any) => issue.path[0]);
    type TicketFormErrors = {
      summary?: string;
      projectId?: string;
    };

    let errors: TicketFormErrors = {};

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

export default function CreateTicketPage() {
  const params = useParams();

  return (
    <Form method="post">
      <input
        type="hidden"
        name="projectId"
        id="projectId"
        value={params.projectId}
      />
      <input type="text" name="summary" id="summary" />
      <button type="submit">New Issue</button>
    </Form>
  );
}
