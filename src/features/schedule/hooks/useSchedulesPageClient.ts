"use client";
import { Stack, Grid, Flex, Button, Text, IconButton } from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { getDaysOfMonth, formatDate } from "@/src/utilities/dateUtils";

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

  return {
    year,
    month,
    monthName,
    monthDays,
  };
}
