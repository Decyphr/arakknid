import { Link } from "@remix-run/react";
import type { NavLink } from "./Sidebar";

export default function SidebarNavLink(props: NavLink) {
  const baseClasses = "flex items-center rounded-lg p-2 transition";
  const inactiveClasses =
    "text-slate-500 border-2 border-transparent hover:border-slate-500 hover:text-slate-900";
  const activeClasses = "text-slate-900 border-2 border-slate-900";

  const classes =
    baseClasses + " " + (props.current ? activeClasses : inactiveClasses);

  return (
    <Link to={props.href} className={classes}>
      <span className="m-auto block h-6 w-6">{props.icon}</span>
    </Link>
  );
}
