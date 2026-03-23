"use client";

import { styles } from "@/features/schedule/styles/column.styles";
import { Stack, Text, Box, Separator, Center, Flex } from "@chakra-ui/react"

import { ColumnCreateScheduleDialog } from "@/features/schedule/components/ColumnCreateScheduleDialog";
import { ColumnTask } from "@/features/schedule/components/ColumnTask";

import { useColumn } from "@/features/schedule/hooks/useColumn";

import { formatDateForInput } from "@/src/utilities/dateUtils";

type ColumnProps = {
   day: string;
   dayOfWeek: string;
}

export function Column({
   day,
   dayOfWeek
}: ColumnProps) {

   const {
      open,
      handleOpenDialog
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
         </Stack>

         {/* create schedule dialog */}
         <ColumnCreateScheduleDialog
            openDialog={open}
            onOpenDialog={handleOpenDialog}
            day={formatDateForInput(day)}
         />
      </Stack>
   )
}