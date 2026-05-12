import { Outlet } from "@tanstack/react-router";
import { FloatingOrbs } from "./FloatingOrbs";

export function DashboardLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingOrbs />
      <main className="relative z-10 px-4 md:px-10 py-6 md:py-10 max-w-[1600px] mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
