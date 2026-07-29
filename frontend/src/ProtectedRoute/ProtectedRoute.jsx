"use client";

import React, { useEffect, useState } from "react";
import ClientRedirect from "@/Components/ClientRedirect";

const ProtectedRoute = ({ children }) => {
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "null");
      setAllowed(Boolean(token && user?.role === "admin"));
    } catch {
      setAllowed(false);
    } finally {
      setReady(true);
    }
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-slate-500 font-semibold">
        Checking access…
      </div>
    );
  }

  if (!allowed) {
    return <ClientRedirect to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
