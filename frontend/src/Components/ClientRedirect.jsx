"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Client-side redirect (replaces react-router Navigate) */
export default function ClientRedirect({ to }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, [router, to]);

  return (
    <div className="p-8 text-center text-sm text-slate-500 font-semibold">
      Redirecting…
    </div>
  );
}
