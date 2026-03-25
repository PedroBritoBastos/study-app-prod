"use client";

import { styles } from "@/features/schedule/styles/column.styles";
import { Stack, Text, Box, Separator, Center, Flex } from "@chakra-ui/react"

import { ColumnCreateScheduleDialog } from "@/features/schedule/components/ColumnCreateScheduleDialog";
import { ColumnTask } from "@/features/schedule/components/ColumnTask";

import { useColumn } from "@/features/schedule/hooks/useColumn";

import { formatDateForInput } from "@/src/utilities/dateUtils";

import { ScheduleType } from "../types/Schedule";
import { ScheduleTaskType } from "../types/ScheduleTask";

type ColumnProps = {
   day: string;
   dayOfWeek: string;
   schedule?: { schedule: ScheduleType, currentScheduleTasks: ScheduleTaskType[] } | null;
}

export function Column({
   day,
   dayOfWeek,
   schedule
}: ColumnProps) {

   console.log("dia da coluna: ", day)
   console.log("schedule: ", schedule)

   const {
      open,
      handleOpenDialog,
      handleCloseDialog,
      closeDialog
   } = useColumn();

   return (
      <Stack {...styles.container} onClick={handleOpenDialog}>
         {/* date container */}
         <Box {...styles.dateContainer}>
            <Separator {...styles.separator} />
            <Text {...styles.date}>{day.slice(0, 5)}</Text>
            <Box {...styles.decorativeCircle} {...styles.decorativeCircleLeft}></Box>
            <Box {...styles.decorativeCircle} {...styles.decorativeCircleRight}></Box>
         </Box>
         <Text {...styles.dayOfWeek}>{dayOfWeek}</Text>

         {/* schedule tasks container */}
         <Stack {...styles.scheduleTasksContainer}
            cursor={"pointer"}
            _hover={{ bg: "gray.100" }}
         >
            {schedule && schedule.currentScheduleTasks.map((task) => (
               <ColumnTask
                  key={task.id}
                  title={task.title}
               />
            ))}

            {/* indicador de quantidade de tasks */}
            {
               schedule && (
                  <Flex {...styles.numberOfTasksIndicatorContainer}>
                     <Center {...styles.numberOfTasksIndicator}>
                        {schedule.currentScheduleTasks.length}
                     </Center>
                  </Flex>
               )
            }
         </Stack>

         {/* create schedule dialog */}
         <ColumnCreateScheduleDialog
            openDialog={open}
            onCloseDialog={handleCloseDialog}
            closeDialog={closeDialog}
            day={formatDateForInput(day)}
         />
      </Stack>
   )
}