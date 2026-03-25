"use client";
import { Stack, Grid, Flex, Button, Text, IconButton } from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { getDaysOfMonth, formatDate } from "@/src/utilities/dateUtils";
import { ScheduleTaskModel } from "../models/ScheduleTask";
import { ScheduleType } from "../types/Schedule";

import { MouseEvent } from "react";
import { ScheduleTaskType } from "../types/ScheduleTask";

type DataType = {
  schedule: ScheduleType;
  currentScheduleTasks: ScheduleTaskType[];
};

export function useSchedulesPageClient(serverData: DataType[]) {
  // data atual
  const [currentDate, setCurrentDate] = useState(new Date());

  // schedules data
  const [data, setData] = useState<DataType[]>(serverData);

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
    data,
    handleNextMonth,
    handlePreviousMonth,
  };
}
