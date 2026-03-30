"use client";

import { styles } from "@/features/schedule/styles/schedulesPageClientCalendarDay.styles";
import { SchedulesDataType } from "@/features/schedule/types/GlobalScheduleData";
import { useRouter } from "next/navigation";

import { Card, Center, Stack, Text } from "@chakra-ui/react";

type SchedulesPageCalendarDayProps = {
   day: string;
   schedule?: SchedulesDataType;
}

export function SchedulesPageCalendarDay({ day, schedule }: SchedulesPageCalendarDayProps) {
   const router = useRouter();
   const tasks = schedule?.currentScheduleTasks ?? [];
   const visibleTasks = tasks.slice(0, 3);
   const remaining = tasks.length - 3;

   function handleCardClick(e: React.MouseEvent<HTMLElement>) {
      e.stopPropagation();
      if (schedule) router.replace(`/schedules/${schedule?.schedule.id}`);
   }

   return (
      <Card.Root {...styles.cardRoot}
         cursor={schedule ? "pointer" : "initial"}
         _hover={schedule ? { bg: "gray.100" } : {}}
         onClick={handleCardClick}
      >
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