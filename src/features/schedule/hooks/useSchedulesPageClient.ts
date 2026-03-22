"use client";
import { Stack, Grid, Flex, Button, Text, IconButton } from "@chakra-ui/react";

import { useState } from "react";

export function useSchedulesPageClient() {
  // data atual
  const [currentDate, setCurrentDate] = useState(new Date());

  // dia, ano e mes que será apresentado na coluna
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
  }).format(currentDate);
}
