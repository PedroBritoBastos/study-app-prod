"use client";

import { styles } from "@/features/schedule/styles/schedulesPageClientCalendarDay.styles";

import { Card, Center } from "@chakra-ui/react";

type SchedulesPageCalendarDayProps = {
   day: string;
}

export function SchedulesPageCalendarDay({ day }: SchedulesPageCalendarDayProps) {
   return (
      <Card.Root {...styles.cardRoot}>
         <Card.Header {...styles.cardHeader}>
            <Center  {...styles.dayContainer} >
               {day}
            </Center>
         </Card.Header>
      </Card.Root>
   )
}