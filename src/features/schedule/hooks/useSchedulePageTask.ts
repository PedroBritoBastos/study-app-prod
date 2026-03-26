"use client";

import { useState } from "react";

export function useSchedulePageTask(isCheckedValue: boolean) {
  const [isChecked, setIsChecked] = useState<boolean>(isCheckedValue);

  function checkTask(): void {
    setIsChecked(true);
  }

  function uncheckTask(): void {
    setIsChecked(false);
  }

  function handleCheckTask(): void {
    if (!isChecked) {
      checkTask();
      return;
    }
    uncheckTask();
  }

  return {
    isChecked,
    handleCheckTask,
  };
}
