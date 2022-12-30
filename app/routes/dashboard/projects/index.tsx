import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { getProjectListItems } from "~/models/project.server";
import ProjectCard from "~/lib/components/project/ProjectCard";
import { PlusIcon } from "@heroicons/react/20/solid";
import Header from "~/lib/components/navs/Header";

type LoaderData = {
  projects: Awaited<ReturnType<typeof getProjectListItems>>;
};

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const projects = await getProjectListItems({ userId });

  return json<LoaderData>({ projects });
}

export default function ProjectIndexRoute() {
  const { projects } = useLoaderData() as LoaderData;

  return (
    <>
      <Header title="Projects"></Header>
      <div className="grid grid-cols-6 gap-5 lg:gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
        <Link
          to="new"
          className="flex h-full cursor-pointer items-center justify-center rounded border border-dashed border-slate-200 py-12 text-slate-200 transition hover:border-white hover:text-white"
        >
          <div>
            <PlusIcon className="m-auto mb-2 h-6 w-6" />
            <p>New Project</p>
          </div>
        </Link>
      </div>
    </>
  );
}
