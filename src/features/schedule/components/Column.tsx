"use client";

import { styles } from "@/features/schedule/styles/column.styles";
import { Stack, Text, Box, Separator, Center, Flex } from "@chakra-ui/react"

type ColumnProps = {
   day: string;
   dayOfWeek: string;
}

export function Column({
   day,
   dayOfWeek
}: ColumnProps) {
   return (
      <Stack {...styles.container}>
         {/* date container */}
         <Box {...styles.dateContainer}>
            <Separator {...styles.separator} />
            <Text {...styles.date}>{day.slice(0, 5)}</Text>
            <Box {...styles.decorativeCircle} {...styles.decorativeCircleLeft}></Box>
            <Box {...styles.decorativeCircle} {...styles.decorativeCircleRight}></Box>
         </Box>
         <Text {...styles.dayOfWeek}>{dayOfWeek}</Text>
      </Stack>
   )
}