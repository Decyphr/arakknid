import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
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

  return redirect("/projects");
}

export default function ProjectDetailsPage() {
  const { project } = useLoaderData<typeof loader>();

  return (
    <div>
      {project.title}
      <p>{project?.description}</p>
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-red-500  py-2 px-4 text-white hover:bg-red-600 focus:bg-red-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}
