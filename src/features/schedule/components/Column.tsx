"use client";

import { styles } from "@/features/schedule/styles/column.styles";
import { Stack, Text, Box, Separator, Center, Flex } from "@chakra-ui/react"

import { ColumnCreateScheduleDialog } from "@/features/schedule/components/ColumnCreateScheduleDialog";
import { ColumnDeleteScheduleDialog } from "@/features/schedule/components/ColumnDeleteScheduleDialog";
import { ColumnTask } from "@/features/schedule/components/ColumnTask";

import { useColumn } from "@/features/schedule/hooks/useColumn";

import { formatDateForInput } from "@/src/utilities/dateUtils";

import { SchedulesDataType } from "../types/GlobalScheduleData";

type ColumnProps = {
   day: string;
   dayOfWeek: string;
   schedule?: SchedulesDataType | null;
}

export function Column({
   day,
   dayOfWeek,
   schedule,
}: ColumnProps) {

   const {
      open,
      handleOpenDialog,
      handleCloseDialog,
      closeDialog
   } = useColumn(schedule);

   return (
      <Stack {...styles.container} onClick={handleOpenDialog}>
         {/* date container */}
         <Box {...styles.dateContainer}>
            <Separator {...styles.separator} />
            <Text {...styles.date}>{day}</Text>
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
                  executionTime={task.executionTime}
               />
            ))}

            {/* indicador de quantidade de tasks e botao de excluir */}
            {
               schedule && (
                  <Flex {...styles.numberOfTasksIndicatorContainer}>
                     <ColumnDeleteScheduleDialog
                        scheduleDay={day}
                        numberOfTasks={schedule.currentScheduleTasks.length}
                        scheduleId={schedule.schedule.id}
                     />
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