import type { ReactNode } from "react";
import { Form, Link } from "@remix-run/react";

import { useUser } from "~/utils";
import SidebarNavLink from "./SidebarNavLink";
import {
  ArrowLeftCircleIcon,
  ChartPieIcon,
  Cog8ToothIcon,
  RectangleStackIcon,
} from "@heroicons/react/20/solid";
import SidebarNavMenu from "./SidebarNavMenu";

export type NavLink = {
  name: string;
  href: string;
  current: boolean;
  icon?: ReactNode;
  nested?: Array<any>;
};

export default function Sidebar() {
  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      current: true,
      icon: <ChartPieIcon />,
      nested: [],
    },

    // TODO: Dynamically add any projects as children to Projects nav
    {
      name: "Projects",
      href: "/dashboard/projects",
      current: false,
      icon: <RectangleStackIcon />,
      nested: [
        {
          name: "All Projects",
          href: "/dashboard/projects",
          current: false,
          icon: <RectangleStackIcon />,
        },
      ],
    },
    {
      name: "Settings",
      href: "/dashboard/account/settings",
      current: false,
      icon: <Cog8ToothIcon />,
    },
  ];

  const user = useUser();
  return (
    <div className="flex h-screen flex-col justify-between border-r bg-white">
      <div className="px-4 py-6">
        <span className="block h-10 w-32 rounded-lg bg-zinc-200"></span>

        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
          {navigation.map((link: NavLink, idx) => {
            if (link?.nested?.length)
              return <SidebarNavMenu key={`${idx}-${link.name}`} {...link} />;
            else {
              return (
                <SidebarNavLink
                  key={`${idx}-${link.name}`}
                  icon={link.icon}
                  {...link}
                />
              );
            }
          })}
          <Form
            action="/logout"
            method="post"
            className="flex items-center rounded-lg px-4 py-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
          >
            <div className="h-4 w-4">
              <ArrowLeftCircleIcon />
            </div>
            <button
              type="submit"
              className="ml-3 flex w-full text-left text-sm font-medium"
            >
              <span>Logout</span>
            </button>
          </Form>
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-zinc-100">
        <Link
          to="/dashboard"
          className="flex shrink-0 items-center bg-white p-4 hover:bg-zinc-50"
        >
          <img
            alt="Man"
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            className="h-10 w-10 rounded-full object-cover"
          />

          <div className="ml-1.5">
            <p className="text-xs">
              <strong className="block font-medium">Account</strong>
              <span>{user.email}</span>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
