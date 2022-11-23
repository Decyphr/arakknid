import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getProjectListItems } from "~/models/project.server";

import { requireUserId } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const projectListItems = await getProjectListItems({ userId });

  return json({ projectListItems });
}

export default function ProjectIndexPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <p>
      No project selected. Select a project on the left, or{" "}
      <Link to="create" className="text-blue-500 underline">
        create a project note.
      </Link>
      <ul className="menu bg-base-100 text-base-content w-56 p-4">
        <li>
          <Link className="py-1" to="/dashboard">
            Projects
          </Link>
        </li>
        {data.projectListItems.map(({ id, title }: any) => (
          <li key={id}>
            <Link to={`${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </p>
  );
}
