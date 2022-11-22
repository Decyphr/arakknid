import { Link } from "@remix-run/react";
import type { NavLink } from "./Sidebar";

export default function SidebarNavLink(props: NavLink) {
  const baseClasses = "flex items-center rounded-lg px-4 py-2";
  const inactiveClasses = "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700";
  const activeClasses = "bg-zinc-100 text-zinc-700";

  const classes =
    baseClasses + " " + (props.current ? activeClasses : inactiveClasses);

  return (
    <Link to={props.href} className={classes}>
      <div className="h-4 w-4">{props.icon}</div>
      <span className="ml-3 text-sm font-medium">{props.name}</span>
    </Link>
  );
}
