import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getUserId } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/dashboard/projects");
  return redirect("/login");
}
