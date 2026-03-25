"use client";

import { styles } from "@/features/schedule/styles/schedulesPageClient.styles";
import scrollStyles from "@/styles/sidebar/scroll.module.css";

import { Stack, Grid, Flex, Button, Text, IconButton } from "@chakra-ui/react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { PageCreateScheduleDialog } from "@/features/schedule/components/PageCreateScheduleDialog";
import { Column } from "@/features/schedule/components/Column";

import { useSchedulesPageClient } from "@/features/schedule/hooks/useSchedulesPageClient";
import { formatDate } from "@/src/utilities/dateUtils";

import { ScheduleType } from "../types/Schedule";
import { ScheduleTaskType } from "../types/ScheduleTask";

type SchedulesPageClientProps = {
   data: { schedule: ScheduleType, currentScheduleTasks: ScheduleTaskType[] }[];
}

export function SchedulesPageClient({ data }: SchedulesPageClientProps) {
   const {
      year,
      month,
      monthName,
      monthDays,
      handleNextMonth,
      handlePreviousMonth
   } = useSchedulesPageClient();

   console.log(data)

   return (
      <Stack {...styles.container}>
         {/* Criar Schedule */}
         <Flex {...styles.headerContainer}>
            {/* create actions */}
            <Flex>
               <PageCreateScheduleDialog />
            </Flex>

            {/* month control */}
            <Flex {...styles.monthControlContainer}>
               <IconButton size={"xs"} rounded={"full"} colorPalette={"purple"} onClick={handlePreviousMonth}>
                  <ChevronLeft />
               </IconButton>
               <Text fontSize={"2xl"}>{`${monthName}, ${year}`}</Text>
               <IconButton size={"xs"} rounded={"full"} colorPalette={"purple"} onClick={handleNextMonth}>
                  <ChevronRight />
               </IconButton>
            </Flex>
            {/* ///// */}
         </Flex>


         {/* Grid de colunas */}
         <Grid {...styles.grid} className={scrollStyles["scrollbar"]}>
            {
               monthDays.map((day, index) => {
                  return (
                     <Column
                        key={index}
                        day={formatDate(day.toISOString())}
                        dayOfWeek={day.toLocaleDateString("pt-BR", { weekday: "long" }).slice(0, 3).toUpperCase()}
                     />)
               })
            }
         </Grid>

      </Stack>
   )
}