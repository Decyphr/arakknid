import SidebarNavLink from "./SidebarNavLink";
import type { NavLink } from "./Sidebar";

export default function SidebarNavMenu(props: NavLink) {
  return (
    <details className="group">
      <summary className="flex cursor-pointer items-center rounded-lg px-4 py-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700">
        <div className="h-4 w-4">{props.icon}</div>

        <span className="ml-3 text-sm font-medium">{props.name}</span>

        <span className="ml-auto shrink-0 transition duration-300 group-open:-rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </summary>

      <nav aria-label="Teams Nav" className="mt-1.5 ml-8 flex flex-col">
        {props?.nested?.map((child, idx) => (
          <SidebarNavLink key={`${idx}-${child.name}`} {...child} />
        ))}
      </nav>
    </details>
  );
}
