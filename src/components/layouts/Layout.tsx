import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Sidebar />
      <div className="lg:mr-64 transition-all duration-300 pt-16 lg:pt-0">
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
