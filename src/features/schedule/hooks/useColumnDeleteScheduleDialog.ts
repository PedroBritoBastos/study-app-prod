"use client";

import { useState } from "react";

export function useColumnDeleteScheduleDialog() {
  const [open, setOpen] = useState(false);

  function handleOpen(e?: React.MouseEvent) {
    e?.stopPropagation();
    setOpen(true);
  }

  function handleClose(e?: React.MouseEvent) {
    e?.stopPropagation();
    setOpen(false);
  }

  return {
    open,
    setOpen,
    handleOpen,
    handleClose,
  };
}
