"use client";

import { useState } from "react";

export function useSaveScheduleWarning() {
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState<boolean>(false);

  function handleOpenSaveCreateScheduleDialog(): void {
    setIsSaveDialogOpen((prev) => !prev);
  }

  return { isSaveDialogOpen, handleOpenSaveCreateScheduleDialog };
}
