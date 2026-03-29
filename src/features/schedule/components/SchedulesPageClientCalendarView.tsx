"use client";

import { styles } from "@/features/schedule/styles/schedulesPageClientCalendarView.styles";

import { Grid, Text } from "@chakra-ui/react";

const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

export function SchedulesPageClientCalendarView() {
   return (
      <Grid {...styles.dayOfWeekGrid}>
         {weekDays.map((day) => (
            <Text key={day} {...styles.dayOfWeek}>
               {day}
            </Text>
         ))}

         {/* aqui entram os dias do mês depois */}
      </Grid>
   );
}