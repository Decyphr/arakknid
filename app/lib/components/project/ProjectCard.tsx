import { Link } from "@remix-run/react";

type ProjectCardProps = {
  id: string;
  title: string;
  description: string;
};

export default function ProjectCard({
  id,
  title,
  description,
}: ProjectCardProps) {
  return (
    <Link
      to={id}
      className="cursor-pointer rounded border-2 border-transparent bg-white p-5 shadow transition hover:-translate-y-1 hover:border-indigo-400 hover:bg-indigo-50"
    >
      <h2 className="mb-2 text-2xl font-black">{title}</h2>
      <p className="text-slate-500">
        <em>{description}</em>
      </p>
      <p className="mt-6">Tickets: 12 (7 open)</p>
    </Link>
  );
}
