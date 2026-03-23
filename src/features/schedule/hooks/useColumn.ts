"use client";

import { useState, MouseEvent } from "react";

export function useColumn() {
  const [open, setOpen] = useState<boolean>(false);

  function handleOpenDialog(e: MouseEvent<HTMLElement>): void {
    e.stopPropagation();
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
