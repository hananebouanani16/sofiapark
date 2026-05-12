import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "./Sidebar";

export function DashboardLayout() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 min-w-0 px-4 md:px-8 py-6 md:py-8">
        <Outlet />
      </main>
    </div>
  );
}
