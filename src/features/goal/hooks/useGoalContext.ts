"use client";

import { useContext } from "react";
import { GoalContext } from "@/features/goal/contexts/GoalContext";

export function useGoalContext() {
  const context = useContext(GoalContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return context;
}
