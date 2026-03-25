"use client";

import { useState, MouseEvent } from "react";
import { SchedulesDataType } from "../types/GlobalScheduleData";

export function useColumn(schedule: SchedulesDataType | null | undefined) {
  const [open, setOpen] = useState<boolean>(false);

  function handleOpenDialog(e: MouseEvent<HTMLElement>): void {
    e.stopPropagation();
    if (schedule) return;
    setOpen(true);
  }

  function handleCloseDialog(e: MouseEvent<HTMLElement>): void {
    e.stopPropagation();
    setOpen(false);
  }

  function closeDialog(): void {
    setOpen(false);
  }

  return {
    open,
    handleOpenDialog,
    handleCloseDialog,
    closeDialog,
  };
}
