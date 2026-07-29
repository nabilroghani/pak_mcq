"use client";

import AdminSidebar from "@/Components/Admin/AdminSidebar";
import ProtectedRoute from "@/ProtectedRoute/ProtectedRoute";

export default function AdminShell({ children }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex bg-white">
        <AdminSidebar />
        <main className="flex-1 h-screen overflow-y-auto">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
