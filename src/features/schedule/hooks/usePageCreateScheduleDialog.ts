"use client";

import { MouseEvent, ChangeEvent, useState } from "react";

import { useSaveScheduleWarning } from "@/features/schedule/hooks/useSaveScheduleWarning";

export function usePageCreateScheduleDialog() {
  const { handleOpenSaveCreateScheduleDialog, isSaveDialogOpen } =
    useSaveScheduleWarning();

  const [scheduleDay, setScheduleDay] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [executionTime, setExecutionTime] = useState<string>("");
  const [invalid, setInvalid] = useState<boolean>(false);

  const [tasks, setTasks] = useState<
    { title: string; executionTime: string }[]
  >([]);

  function handleScheduleDayInputChange(
    e: ChangeEvent<HTMLInputElement>,
  ): void {
    e.stopPropagation();
    setScheduleDay(e.target.value);
  }

  function handleTitleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    e.stopPropagation();
    setTitle(e.target.value);
  }

  function handleExecutionTimeInputChange(
    e: ChangeEvent<HTMLInputElement>,
  ): void {
    e.stopPropagation();
    setExecutionTime(e.target.value);
  }

  function handleCreateTask(e: MouseEvent<HTMLButtonElement>): void {
    e.stopPropagation();

    setInvalid(false);
    if (!title) {
      setInvalid(true);
      return;
    }
  }

  function handleCreateSchedule(e: MouseEvent<HTMLButtonElement>): void {
    e.stopPropagation();
    if (tasks.length === 0) {
      handleOpenSaveCreateScheduleDialog();
      return;
    }
  }

  return {
    scheduleDay,
    isSaveDialogOpen,
    title,
    executionTime,
    invalid,
    handleScheduleDayInputChange,
    handleCreateSchedule,
    handleTitleInputChange,
    handleExecutionTimeInputChange,
    handleOpenSaveCreateScheduleDialog,
    handleCreateTask,
  };
}
