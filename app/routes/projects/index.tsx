import { Link } from "@remix-run/react";

export default function ProjectIndexPage() {
  return (
    <p>
      No project selected. Select a project on the left, or{" "}
      <Link to="create" className="text-blue-500 underline">
        create a project note.
      </Link>
    </p>
  );
}
