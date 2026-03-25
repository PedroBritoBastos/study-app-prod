"use client";

import { styles } from "@/features/schedule/styles/schedulesPageClient.styles";
import scrollStyles from "@/styles/sidebar/scroll.module.css";

import { Stack, Grid, Flex, Button, Text, IconButton } from "@chakra-ui/react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { PageCreateScheduleDialog } from "@/features/schedule/components/PageCreateScheduleDialog";
import { Column } from "@/features/schedule/components/Column";

import { useSchedulesPageClient } from "@/features/schedule/hooks/useSchedulesPageClient";
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
      handlePreviousMonth
   } = useSchedulesPageClient(serverData);

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