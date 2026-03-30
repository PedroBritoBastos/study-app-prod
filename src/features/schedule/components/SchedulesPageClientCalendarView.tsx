"use client";

import { styles } from "@/features/schedule/styles/schedulesPageClientCalendarView.styles";
import ScrollStyles from "@/styles/sidebar/scroll.module.css";

import { Grid, Text } from "@chakra-ui/react";
import { SchedulesPageCalendarDay } from "@/features/schedule/components/SchedulesPageClientCalendarDay";
import { SchedulesPageCalendarEmptyDay } from "@/features/schedule/components/SchedulesPageClientCalendarEmptyDay";

import { formatDate } from "@/src/utilities/dateUtils";

import { useScheduleContext } from "@/features/schedule/hooks/useScheduleContext";

const daysOfWeek = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

type SchedulesPageClientCalendarViewProps = {
   monthDays: Date[];
}

export function SchedulesPageClientCalendarView({
   monthDays
}: SchedulesPageClientCalendarViewProps) {

   const { globalSchedulesData } = useScheduleContext();

   const firstDayOfWeek = monthDays[0]?.getDay() ?? 0;
   const emptyDays = Array.from({ length: firstDayOfWeek });

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

            {/* espaços vazios */}
            {emptyDays.map((_, index) => (
               <SchedulesPageCalendarEmptyDay key={`empty-${index}`} />
            ))}

            {/* dias do mês */}
            {monthDays.map((day, index) => {
               const scheduleForDay = globalSchedulesData.find((item) => {
                  const scheduleDate = new Date(item.schedule.scheduleDay);

                  return (
                     scheduleDate.getFullYear() === day.getFullYear() &&
                     scheduleDate.getMonth() === day.getMonth() &&
                     scheduleDate.getDate() === day.getDate()
                  );
               });

               return (
                  <SchedulesPageCalendarDay
                     key={index}
                     day={formatDate(day.toISOString()).slice(0, 2)}
                     schedule={scheduleForDay}
                  />
               );
            })}

         </Grid>
      </>
   );
}

