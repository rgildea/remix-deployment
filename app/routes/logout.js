import { json } from "@remix-run/node";
import { destroyUserSession } from "~/data/auth.server";

export function action({ request }) {
  console.log("entering action for logout");
  if (request.method !== "POST") {
    throw json({ message: "Invalid request method" }, { status: 400 });
  }

  console.log("logout called, now calling destroyUserSession");
  return destroyUserSession(request);
}
