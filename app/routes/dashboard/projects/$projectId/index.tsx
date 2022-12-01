import { PlusIcon } from "@heroicons/react/20/solid";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Header from "~/lib/components/navs/Header";
import TicketCard from "~/lib/components/ticket/TicketCard";
import { deleteProject, getProject } from "~/models/project.server";
import { requireUserId } from "~/session.server";

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.projectId, "projectId not found");

  const project = await getProject({ userId, id: params.projectId });
  if (!project) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ project });
}

export async function action({ request, params }: ActionArgs) {
  const userId = await requireUserId(request);
  invariant(params.projectId, "projectId not found");

  await deleteProject({ userId, id: params.projectId });

  return redirect("/dashboard/projects");
}

export default function ProjectDetailsRoute() {
  const { project } = useLoaderData<typeof loader>();

  return (
    <div>
      <Header title={project.title} description={project.description}>
        <Form method="post">
          <button
            type="submit"
            className="rounded bg-red-500  py-2 px-4 text-white hover:bg-red-600 focus:bg-red-400"
          >
            Delete
          </button>
        </Form>
      </Header>
      <div className="grid grid-cols-4 gap-8">
        {project.tickets.map((ticket) => (
          <TicketCard key={ticket.id} {...ticket} />
        ))}
        <Link
          to="ticket/new"
          className="flex cursor-pointer items-center justify-center rounded border border-dashed border-slate-600 py-8 text-slate-500 transition hover:-translate-y-1 hover:border-emerald-400 hover:bg-emerald-50 hover:text-slate-900"
        >
          <div>
            <PlusIcon className="m-auto mb-2 h-6 w-6" />
            <p>New Ticket</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
