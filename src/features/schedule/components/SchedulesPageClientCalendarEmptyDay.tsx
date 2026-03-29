"use client";

import { styles } from "@/features/schedule/styles/schedulesPageClientCalendarEmptyDay.styles";

import { Card } from "@chakra-ui/react";

export function SchedulesPageCalendarEmptyDay() {
   return (
      <Card.Root {...styles.cardRoot}></Card.Root>
   )
}