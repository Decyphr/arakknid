import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import { getProjectListItems } from "~/models/project.server";
import type { LoaderArgs } from "@remix-run/server-runtime";
import Header from "~/components/navs/Header";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const projectListItems = await getProjectListItems({ userId });

  return json({ projectListItems });
}

export default function ProjectLayout() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  return (
    <div>
      <Header />
      <div className="drawer-mobile drawer">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <label
            htmlFor="my-drawer-2"
            className="btn-primary drawer-button btn absolute bottom-10 left-10 lg:hidden"
          >
            Open drawer
          </label>

          <main>
            <div className="flex-1 p-6">
              <Outlet />
            </div>
          </main>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu w-56 bg-base-100 p-4 text-base-content">
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            {data.projectListItems.map((p) => (
              <li key={p.id}>
                <Link
                  to={{
                    pathname: `/projects/${p.id}`,
                  }}
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
