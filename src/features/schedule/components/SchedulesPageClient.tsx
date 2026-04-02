"use client";

import { styles } from "@/features/schedule/styles/schedulesPageClient.styles";
import scrollStyles from "@/styles/sidebar/scroll.module.css";

import { Stack, Grid, Flex, Button, Text, IconButton } from "@chakra-ui/react"
import { ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";
import { PageCreateScheduleDialog } from "@/features/schedule/components/PageCreateScheduleDialog";
import { Column } from "@/features/schedule/components/Column";
import { SchedulesPageClientFilter } from "@/features/schedule/components/SchedulesPageClientFilter";
import { SchedulesPageClientCalendarView } from "@/features/schedule/components/SchedulesPageClientCalendarView";

import { useSchedulesPageClient } from "@/features/schedule/hooks/useSchedulesPageClient";
import { useScheduleContext } from "@/features/schedule/hooks/useScheduleContext";
import { formatDateString, getWeekDay, formatDate, getDayFromFormatedDateString, formatDay } from "@/src/utilities/dateUtils";

import { SchedulesDataType } from "../types/GlobalScheduleData";

type SchedulesPageClientProps = {
   serverData: SchedulesDataType[];
}

export function SchedulesPageClient({ serverData }: SchedulesPageClientProps) {
   const {
      year,
      monthName,
      monthDays,
      globalSchedulesData,
      handleNextMonth,
      handlePreviousMonth,
      handleToggleCalendarViewMode
   } = useSchedulesPageClient(serverData);

   const { filterMode, filteredGlobalSchedulesData, calendarViewMode } = useScheduleContext();

   return (
      <Stack {...styles.container}>
         <Flex {...styles.headerContainer}>
            <Flex gap={5}>
               <PageCreateScheduleDialog />

               <SchedulesPageClientFilter
                  serverData={serverData}
                  isInCalendarViewMode={calendarViewMode}
               />

               <Button
                  colorPalette={"purple"}
                  variant={calendarViewMode ? "solid" : "surface"}
                  display={"flex"}
                  alignItems={"center"}
                  onClick={handleToggleCalendarViewMode}
               >
                  {
                     calendarViewMode ? <Eye /> : <EyeOff />
                  }
                  Modo calendário
               </Button>
            </Flex>

            {
               !filterMode && (
                  <Flex {...styles.monthControlContainer}>
                     <IconButton size={"xs"} rounded={"full"} colorPalette={"purple"} onClick={handlePreviousMonth}>
                        <ChevronLeft />
                     </IconButton>
                     <Text fontSize={"2xl"}>{`${monthName}, ${year}`}</Text>
                     <IconButton size={"xs"} rounded={"full"} colorPalette={"purple"} onClick={handleNextMonth}>
                        <ChevronRight />
                     </IconButton>
                  </Flex>
               )
            }
         </Flex>

         {
            calendarViewMode ? (
               <SchedulesPageClientCalendarView
                  monthDays={monthDays} />
            ) : (
               <Grid {...styles.grid} className={scrollStyles["scrollbar"]}>
                  {filterMode ?
                     filteredGlobalSchedulesData.map((schedule, index) => (
                        <Column
                           key={index}
                           day={formatDateString(schedule.schedule.scheduleDay)}
                           dayOfWeek={getWeekDay(schedule.schedule.scheduleDay).slice(0, 3).toUpperCase()}
                           schedule={schedule ? schedule : null}
                        />
                     )) : monthDays.map((day, index) => {
                        const schedule = globalSchedulesData.find((item) => item.schedule.scheduleDay === formatDay(formatDate(day.toISOString())));

                        return (
                           <Column
                              key={index}
                              day={formatDate(day.toISOString())}
                              dayOfWeek={getWeekDay(formatDay(formatDate(day))).slice(0, 3).toUpperCase()}
                              schedule={schedule ? schedule : null}
                           />)
                     })
                  }
               </Grid>
            )
         }

      </Stack>
   )
}