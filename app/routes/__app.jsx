// /expenses/add

import { Outlet } from "@remix-run/react";

import expensesStyles from "~/styles/expenses.css";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";
import { getUserFromSession } from "~/data/auth.server";

export default function ExpensesAppLayout() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  );
}

export function loader({ request }) {
  console.log("Setting loader data for marketing pages");
  const userId = getUserFromSession(request);
  console.log("User:", userId);
  return userId;
}

export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}
