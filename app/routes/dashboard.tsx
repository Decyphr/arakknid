import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Sidebar from "~/lib/components/navs/Sidebar";
import { getUserId } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (!userId) return redirect("/login");
  return json({});
}

export default function DashboardLayout() {
  return (
    <div className="flex">
      <section className="w-20">
        <Sidebar currentRoute="/dashboard" />
      </section>
      <section className="w-full">
        <main>
          <div className="mx-auto p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </section>
    </div>
  );
}
