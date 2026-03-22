
"use client"

import { Stack, Text, Flex, Input } from "@chakra-ui/react";

import { styles } from "@/styles/datePicker/datePicker.styles";
import { useDatePicker } from "@/features/goal/hooks/useDatePicker";

type Props = {
   goalId: string;
}

export function DatePicker({
   goalId
}: Props) {

   const {
      globalDeadline,
      handleDateChange
   } = useDatePicker({ goalId });

   return (
      <Stack {...styles.container}>
         <Text {...styles.text}>Terminar até:</Text>
         <Flex {...styles.calendarContainer}>
            <Input
               {...styles.dateInput}
               type="date"
               value={globalDeadline}
               onChange={handleDateChange}
            />
         </Flex>
      </Stack>
   );
}
