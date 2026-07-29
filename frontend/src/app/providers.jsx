"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-KQGQFZCT91";

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    ReactGA.initialize(MEASUREMENT_ID);
  }, []);

  useEffect(() => {
    if (!pathname) return;
    ReactGA.send({
      hitType: "pageview",
      page: pathname,
    });
  }, [pathname]);

  return null;
}
