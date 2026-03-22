"use client";
import { Stack, Grid, Flex, Button, Text, IconButton } from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { getDaysOfMonth, formatDate } from "@/src/utilities/dateUtils";

import { MouseEvent } from "react";

export function useSchedulesPageClient() {
  // data atual
  const [currentDate, setCurrentDate] = useState(new Date());

  // dia, ano e mes que será apresentado na coluna
  const year: number = currentDate.getFullYear();
  const month: number = currentDate.getMonth();
  const monthName: string = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
  }).format(currentDate);

  const monthDays: Date[] = getDaysOfMonth(year, month);

  function handleNextMonth(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  }

  function handlePreviousMonth(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  }

  return {
    year,
    month,
    monthName,
    monthDays,
    handleNextMonth,
    handlePreviousMonth,
  };
}
