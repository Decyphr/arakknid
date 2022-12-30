import { Link } from "@remix-run/react";
import type { NavLink } from "./Sidebar";

export default function SidebarNavLink(props: NavLink) {
  const baseClasses = "flex items-center rounded-lg p-2 transition";
  const inactiveClasses =
    "text-slate-200 border border-transparent hover:border-white hover:text-white";
  const activeClasses = "text-black bg-white shadow";

  const classes =
    baseClasses + " " + (props.current ? activeClasses : inactiveClasses);

  return (
    <Link to={props.href} className={classes}>
      <span className="m-auto block h-6 w-6">{props.icon}</span>
    </Link>
  );
}
