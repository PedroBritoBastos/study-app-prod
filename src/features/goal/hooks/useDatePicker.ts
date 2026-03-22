"use client";

import { useState, useEffect } from "react";
import { useGoalContext } from "@/features/goal/hooks/useGoalContext";

import { updateDeadlineAction } from "@/features/goal/actions/goals/updateDeadline";

type UseDatePickerProps = {
  goalId: string;
  updateDeadlineState: (goalId: string, newDeadline: string) => void;
};

export function useDatePicker({
  goalId,
  updateDeadlineState,
}: UseDatePickerProps) {
  const { globalDeadline, updateGlobalDeadlineStateWithSelectedGoalDeadline } =
    useGoalContext();

  // refatorado
  // atualiza o estado global da deadline
  async function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newDate = e.target.value;
    const today = new Date().toISOString().split("T")[0];

    if (newDate < today) {
      updateGlobalDeadlineStateWithSelectedGoalDeadline(today);
      return;
    }

    await updateDeadlineAction(goalId, newDate);
    updateGlobalDeadlineStateWithSelectedGoalDeadline(newDate);
  }

  return {
    globalDeadline,
    handleDateChange,
  };
}
