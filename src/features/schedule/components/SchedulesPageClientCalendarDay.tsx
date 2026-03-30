"use client";

import { styles } from "@/features/schedule/styles/schedulesPageClientCalendarDay.styles";
import { SchedulesDataType } from "@/features/schedule/types/GlobalScheduleData";

import { Card, Center, Stack, Text } from "@chakra-ui/react";

type SchedulesPageCalendarDayProps = {
   day: string;
   schedule?: SchedulesDataType;
}

export function SchedulesPageCalendarDay({ day, schedule }: SchedulesPageCalendarDayProps) {
   const tasks = schedule?.currentScheduleTasks ?? [];
   const visibleTasks = tasks.slice(0, 3);
   const remaining = tasks.length - 3;

   return (
      <Card.Root {...styles.cardRoot}>
         <Card.Header {...styles.cardHeader}>
            <Center {...styles.dayContainer}>
               {day}
            </Center>
         </Card.Header>

         {schedule && (
            <Card.Body {...styles.cardBody}>
               <Stack>
                  {visibleTasks.map((task) => (
                     <Text key={task.id} {...styles.task}>
                        {task.title}
                     </Text>
                  ))}

                  {remaining > 0 && (
                     <Text {...styles.remainingTasksWarning}>
                        Mais {remaining}...
                     </Text>
                  )}
               </Stack>
            </Card.Body>
         )}
      </Card.Root>
   );
}