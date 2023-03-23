import { redirect } from "@remix-run/node";
import AuthForm from "~/components/auth/AuthForm";
import { login, signup } from "~/data/auth.server";
import { validateCredentials } from "~/data/validation.server";
import authStyles from "~/styles/auth.css";

export default function AuthPage() {
  return <AuthForm />;
}

export async function action({ request }) {
  console.log("starting action");
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }
  console.log("credentials valid");

  try {
    if (authMode === "login") {
      console.log("authmode is login");
      return await login(credentials);
    } else {
      console.log("authmode is not login");
      return await signup(credentials);
    }
  } catch (error) {
    if (error.status === 422) {
      console.log("Error: ", error.message);
      return { credentials: error.message };
    }
  }

  console.log("unreachable?");
  return {};
}

export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}
