"use client";

import { useState } from "react";

import { createScheduleTaskAction } from "@/features/schedule/actions/scheduleTasks/createScheduleTask";
import { ScheduleTaskType } from "@/features/schedule/types/ScheduleTask";

export function useSchedulePageTasksCreateDialog(
  scheduleId: string,
  onAddScheduleTask: (scheduleTask: ScheduleTaskType) => void,
) {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [executionTime, setExecutionTime] = useState<string>("");
  const [invalid, setInvalid] = useState<boolean>(false);

  function handleTitleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ): void {
    e.stopPropagation();
    setTitle(e.target.value);
  }

  function handleExecutionTimeInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ): void {
    e.stopPropagation();
    setExecutionTime(e.target.value);
  }

  function handleOpenDialog() {
    setOpen(true);
  }

  function handleCancel() {
    setTitle("");
    setExecutionTime("");
    setOpen(false);
  }

  async function handleCreateScheduleTask(e: React.MouseEvent) {
    e.stopPropagation();

    setInvalid(false);

    if (title.length === 0) {
      setInvalid(true);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("executionTime", executionTime);

    try {
      const scheduleTask = await createScheduleTaskAction(scheduleId, formData);
      onAddScheduleTask(scheduleTask);
      setTitle("");
      setExecutionTime("");
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    title,
    executionTime,
    open,
    invalid,
    handleExecutionTimeInputChange,
    handleTitleInputChange,
    handleOpenDialog,
    handleCancel,
    handleCreateScheduleTask,
  };
}
