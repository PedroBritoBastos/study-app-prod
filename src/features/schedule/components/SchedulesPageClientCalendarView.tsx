"use client";

import { Grid, Text } from "@chakra-ui/react";

const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

export function SchedulesPageClientCalendarView() {
   return (
      <Grid templateColumns="repeat(7, 1fr)" gap={2}>
         {weekDays.map((day) => (
            <Text
               key={day}
               textAlign="center"
               fontWeight="bold"
               fontSize="sm"
            >
               {day}
            </Text>
         ))}

         {/* aqui entram os dias do mês depois */}
      </Grid>
   );
}