import { redirect } from "next/navigation";

export default function AdminHome() {
  redirect("/admin/dashboard"); // Redirect to dashboard when visiting /admin
}
