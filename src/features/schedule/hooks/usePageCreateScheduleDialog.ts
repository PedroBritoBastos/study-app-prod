"use client";

import { MouseEvent, ChangeEvent, useState } from "react";

import { useSaveScheduleWarning } from "@/features/schedule/hooks/useSaveScheduleWarning";
import { useScheduleContext } from "@/features/schedule/hooks/useScheduleContext";
import { useEffect } from "react";

import { createScheduleAction } from "@/features/schedule/actions/schedules/createSchedule";
import { CreateScheduleActionReturn } from "../types/scheduleActions/CreateScheduleActionReturn";

import { formatToYearMonthDay } from "@/src/utilities/dateUtils";

export function usePageCreateScheduleDialog() {
  const { handleOpenSaveCreateScheduleDialog, isSaveDialogOpen } =
    useSaveScheduleWarning();

  const { addScheduleToGlobalSchedulesData, globalSchedulesData } =
    useScheduleContext();

  const [open, setOpen] = useState<boolean>(false);
  const [scheduleDay, setScheduleDay] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [executionTime, setExecutionTime] = useState<string>("");
  const [invalid, setInvalid] = useState<boolean>(false);
  const [scheduleDayError, setScheduleDayError] = useState<boolean>(false);

  const [tasks, setTasks] = useState<
    { title: string; executionTime: string }[]
  >([]);

  function resetStates() {
    setScheduleDay("");
    setTitle("");
    setExecutionTime("");
    setInvalid(false);
    setScheduleDayError(false);
    setTasks([]);
  }

  function verifyIfScheduleDayAlreadyExists(input: string) {
    // verificando se existe alguma schedule com essa data
    const scheduleDayAlreadyExists = globalSchedulesData.some((item) => {
      return formatToYearMonthDay(item.schedule.scheduleDay) === input;
    });

    return scheduleDayAlreadyExists;
  }

  function handleOpenDialog(e: MouseEvent<HTMLButtonElement>): void {
    setOpen((prev) => {
      const newState = !prev;

      if (newState) {
        resetStates();
      }

      return newState;
    });
  }

  function handleScheduleDayInputChange(
    e: ChangeEvent<HTMLInputElement>,
  ): void {
    e.stopPropagation();

    setScheduleDayError(false);

    if (verifyIfScheduleDayAlreadyExists(e.target.value)) {
      setScheduleDayError(true);
    }

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

    if (scheduleDayError) return;

    if (tasks.length === 0) {
      handleOpenSaveCreateScheduleDialog();
      return;
    }

    // criando formData para o backend
    const formData = new FormData();
    formData.append("scheduleDay", scheduleDay);
    formData.append("tasks", JSON.stringify(tasks));

    // enviando formData para o backend
    try {
      const createdSchedule: CreateScheduleActionReturn =
        await createScheduleAction(formData);
      addScheduleToGlobalSchedulesData({
        schedule: createdSchedule.createdSchedule,
        currentScheduleTasks: createdSchedule.createdTasks,
      });
      setTitle("");
      setTasks([]);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    open,
    scheduleDay,
    isSaveDialogOpen,
    title,
    executionTime,
    invalid,
    tasks,
    scheduleDayError,
    handleOpenDialog,
    handleScheduleDayInputChange,
    handleCreateSchedule,
    handleTitleInputChange,
    handleExecutionTimeInputChange,
    handleOpenSaveCreateScheduleDialog,
    handleCreateTask,
    handleRemoveTask,
  };
}
