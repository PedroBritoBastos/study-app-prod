"use client";

import { useState } from "react";
import { useScheduleContext } from "@/features/schedule/hooks/useScheduleContext";

import { deleteScheduleByIdAction } from "@/features/schedule/actions/schedules/deleteScheduleById";

export function useColumnDeleteScheduleDialog(scheduleId: string) {
  const [open, setOpen] = useState(false);

  const { removeScheduleFromGlobalSchedulesData } = useScheduleContext();

  function handleOpen(e: React.MouseEvent): void {
    e.stopPropagation();
    setOpen(true);
  }

  function handleClose(e: React.MouseEvent): void {
    e.stopPropagation();
    setOpen(false);
  }

  async function handleDelete(e: React.MouseEvent): Promise<void> {
    e.stopPropagation();
    try {
      await deleteScheduleByIdAction(scheduleId);
      removeScheduleFromGlobalSchedulesData(scheduleId);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    open,
    handleOpen,
    handleClose,
    handleDelete,
  };
}
