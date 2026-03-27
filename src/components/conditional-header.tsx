"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";

export function ConditionalHeader() {
  const pathname = usePathname();
  
  // Hide header on journal index and journal article pages
  const isJournalPage = pathname === "/journal" || pathname.startsWith("/journal/");

  if (isJournalPage) return null;

  return <Header />;
}
