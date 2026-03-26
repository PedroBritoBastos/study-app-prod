"use client";

import { useState } from "react";

import { updateScheduleTaskStatusAction } from "@/features/schedule/actions/scheduleTasks/updateScheduleTaskStatus";

export function useSchedulePageTask(isCheckedValue: boolean, taskId: string) {
  const [isChecked, setIsChecked] = useState<boolean>(isCheckedValue);

  function checkTask(): void {
    setIsChecked(true);
  }

  function uncheckTask(): void {
    setIsChecked(false);
  }

  async function handleCheckTask() {
    try {
      await updateScheduleTaskStatusAction(taskId);

      if (!isChecked) {
        checkTask();
      } else {
        uncheckTask();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return {
    isChecked,
    handleCheckTask,
  };
}
