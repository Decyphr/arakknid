import { Outlet } from "@remix-run/react";
import Sidebar from "~/lib/components/navs/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <Sidebar />
      </div>
      <main className="col-span-10">
        <div className="mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
