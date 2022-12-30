import type { ReactNode } from "react";
import SidebarNavLink from "./SidebarNavLink";
import {
  ArrowLeftCircleIcon,
  BugAntIcon,
  ChartPieIcon,
  Cog8ToothIcon,
  RectangleStackIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { Link } from "@remix-run/react";

export type NavLink = {
  name: string;
  href: string;
  current: boolean;
  icon?: ReactNode;
};

type SidebarProps = {
  currentRoute: string;
};

export default function Sidebar({ currentRoute }: SidebarProps) {
  // TODO: identify a way to update the current navLink

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      current: false,
      icon: <ChartPieIcon />,
    },
    {
      name: "Projects",
      href: "/dashboard/projects",
      current: false,
      icon: <RectangleStackIcon />,
    },
    {
      name: "Settings",
      href: "/settings",
      current: false,
      icon: <Cog8ToothIcon />,
    },
  ];
  return (
    <div className="flex h-screen flex-col justify-between border-r border-r-white">
      <div className="px-4 py-6">
        <div className="border-b border-white p-2">
          <BugAntIcon className="m-auto block h-8 w-8" />
        </div>

        <nav aria-label="Main Nav" className="mt-12 flex flex-col space-y-3">
          {navigation.map((link: NavLink, idx) => {
            return (
              <SidebarNavLink
                key={`${idx}-${link.name}`}
                icon={link.icon}
                {...link}
              />
            );
          })}
          <SidebarNavLink
            href="/logout"
            name="Logout"
            current={false}
            icon={<ArrowLeftCircleIcon />}
          />
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-white p-6">
        <Link to="account">
          <span className="m-auto block h-6 w-6">
            <UserCircleIcon />
          </span>
        </Link>
      </div>
    </div>
  );
}
