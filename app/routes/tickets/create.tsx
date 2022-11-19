// endpoint for creating tickets

import type { ActionArgs } from "@remix-run/node";

import { createTicket } from "~/models/ticket.server";

export async function action({ request }: ActionArgs) {
  const summary = "My new issue summary";

  // await createTicket({ summary, projectId: params.projectId });

  console.log(request);
  return;
}
