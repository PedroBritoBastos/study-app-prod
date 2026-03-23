"use client";

import { useState, MouseEvent } from "react";

export function useColumn() {
  const [open, setOpen] = useState<boolean>(false);

  function handleOpenDialog(e: MouseEvent<HTMLElement>): void {
    e.stopPropagation();
    setOpen((prev) => !prev);
  }

  return {
    open,
    handleOpenDialog,
  };
}
