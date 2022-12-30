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
      className="cursor-pointer rounded border border-white bg-black p-5 transition hover:bg-white hover:text-black"
    >
      <h2 className="mb-2 text-2xl font-black">{title}</h2>
      <p className="text-slate-500">
        <em>{description}</em>
      </p>
      <p className="mt-6">Tickets: 12 (7 open)</p>
    </Link>
  );
}
