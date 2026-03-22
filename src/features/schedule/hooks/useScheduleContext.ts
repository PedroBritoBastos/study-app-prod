"use client";

import { useContext } from "react";
import { ScheduleContext } from "@/features/schedule/contexts/ScheduleContext";

export function useGoalContext() {
  const context = useContext(ScheduleContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return context;
}
