"use client";

import { MouseEvent, ChangeEvent, useState } from "react";

import { useSaveScheduleWarning } from "@/features/schedule/hooks/useSaveScheduleWarning";

import { createScheduleAction } from "@/features/schedule/actions/schedules/createSchedule";
import { CreateScheduleActionReturn } from "../types/scheduleActions/CreateScheduleActionReturn";

export function useColumnCreateScheduleDialog(day: string) {
  const { handleOpenSaveCreateScheduleDialog, isSaveDialogOpen } =
    useSaveScheduleWarning();

  const [title, setTitle] = useState<string>("");
  const [executionTime, setExecutionTime] = useState<string>("");
  const [invalid, setInvalid] = useState<boolean>(false);

  const [tasks, setTasks] = useState<
    { title: string; executionTime: string }[]
  >([]);

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

    setTasks((prev) => [
      ...prev,
      { title: title, executionTime: executionTime },
    ]);
    setTitle("");
    setExecutionTime("");
  }

  function handleRemoveTask(taskIndex: number): void {
    setTasks((prev) => prev.filter((_, index) => index !== taskIndex));
  }

  async function handleCreateSchedule(
    e: MouseEvent<HTMLButtonElement>,
  ): Promise<void> {
    e.stopPropagation();

    if (tasks.length === 0) {
      handleOpenSaveCreateScheduleDialog();
      return;
    }

    // criando formData para o backend
    const formData = new FormData();
    formData.append("scheduleDay", day);
    formData.append("tasks", JSON.stringify(tasks));

    // enviando formData para o backend
    try {
      const createdSchedule: CreateScheduleActionReturn =
        await createScheduleAction(formData);
      console.log(createdSchedule);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    isSaveDialogOpen,
    title,
    executionTime,
    invalid,
    tasks,
    handleCreateSchedule,
    handleTitleInputChange,
    handleExecutionTimeInputChange,
    handleOpenSaveCreateScheduleDialog,
    handleCreateTask,
    handleRemoveTask,
  };
}
