"use client";

import { styles } from "@/features/schedule/styles/schedulesPageClient.styles";
import scrollStyles from "@/styles/sidebar/scroll.module.css";

import { Stack, Grid, Flex, Button, Text, IconButton, Select } from "@chakra-ui/react"
import { ChevronLeft, ChevronRight, Eye, EyeOff, Plus } from "lucide-react";
import { PageCreateScheduleDialog } from "@/features/schedule/components/PageCreateScheduleDialog";
import { Column } from "@/features/schedule/components/Column";
import { SchedulesPageClientFilter } from "@/features/schedule/components/SchedulesPageClientFilter";

import { useSchedulesPageClient } from "@/features/schedule/hooks/useSchedulesPageClient";
import { useScheduleContext } from "@/features/schedule/hooks/useScheduleContext";
import { formatDate } from "@/src/utilities/dateUtils";

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
         {/* Criar Schedule */}
         <Flex {...styles.headerContainer}>
            {/* create actions */}
            <Flex gap={5}>
               <PageCreateScheduleDialog />

               {/* filtro */}
               <SchedulesPageClientFilter
                  serverData={serverData}
                  isInCalendarViewMode={calendarViewMode}
               />

               {/* botao para ativar calendarViewMode */}
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

            {/* month control */}
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


         {/* Grid de colunas */}
         <Grid {...styles.grid} className={scrollStyles["scrollbar"]}>
            {filterMode ?
               filteredGlobalSchedulesData.map((schedule, index) => (
                  <Column
                     key={index}
                     day={formatDate(schedule.schedule.scheduleDay.toISOString())}
                     dayOfWeek={schedule.schedule.scheduleDay.toLocaleDateString("pt-BR", { weekday: "long" }).slice(0, 3).toUpperCase()}
                     schedule={schedule ? schedule : null}
                  />
               )) : monthDays.map((day, index) => {

                  // verificando se o dia da coluna possui algum cronograma correspondente
                  const schedule = globalSchedulesData.find((item) => formatDate(item.schedule.scheduleDay.toISOString()) === formatDate(day.toISOString()));

                  return (
                     <Column
                        key={index}
                        day={formatDate(day.toISOString())}
                        dayOfWeek={day.toLocaleDateString("pt-BR", { weekday: "long" }).slice(0, 3).toUpperCase()}
                        schedule={schedule ? schedule : null}
                     />)
               })
            }
         </Grid>

      </Stack>
   )
}