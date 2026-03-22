"use server";

import { Navbar } from "@/src/components/ui/navbar/Navbar";
import { SchedulesPageClient } from "@/src/features/schedule/components/SchedulesPageClient";

export default async function SchedulesPage() {
   return (
      <>
         <Navbar />
      </>
   )
}