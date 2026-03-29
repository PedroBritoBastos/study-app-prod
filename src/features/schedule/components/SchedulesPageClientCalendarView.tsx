"use client";

import { styles } from "@/features/schedule/styles/schedulesPageClientCalendarView.styles";
import ScrollStyles from "@/styles/sidebar/scroll.module.css";

import { Grid, Text } from "@chakra-ui/react";
import { SchedulesPageCalendarDay } from "@/features/schedule/components/SchedulesPageClientCalendarDay";

import { formatDate } from "@/src/utilities/dateUtils";

const daysOfWeek = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

type SchedulesPageClientCalendarViewProps = {
   monthDays: Date[];
}

export function SchedulesPageClientCalendarView({
   monthDays
}: SchedulesPageClientCalendarViewProps) {
   return (
      <>
         <Grid {...styles.dayOfWeekGrid}>
            {daysOfWeek.map((dayOfWeek) => (
               <Text key={dayOfWeek} {...styles.dayOfWeek}>
                  {dayOfWeek}
               </Text>
            ))}
         </Grid>
         <Grid {...styles.monthDaysGrid} className={ScrollStyles["scrollbar"]}>
            {
               monthDays.map((day, index) => (
                  <SchedulesPageCalendarDay
                     key={index}
                     day={formatDate(day.toISOString()).slice(0, 2)}
                  />
               ))
            }
         </Grid>
      </>

   );
}