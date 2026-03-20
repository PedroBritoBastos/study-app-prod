"use client"

import { styles } from "@/styles/goals/goal.styles";

import { Card, Stack, Progress, Text, Span, Flex, Icon } from "@chakra-ui/react";
import { Task } from "@/features/goal/components/Task";
import { CircleCheckBig, Ellipsis, Calendar, CircleAlert } from "lucide-react";

import { GoalType } from "@/features/goal/types/Goal";
import { useGoal } from "@/features/goal/hooks/useGoal";

interface Props {
   goal: GoalType;
   selectGoal: (goal: GoalType) => void;
   openSidebar: () => void;
   checkedTask: { taskId: string; isChecked: boolean };
   refresh: { taskId: string; action: string };
   updatedDeadline: { goalId: string; newDeadline: string };
}

export function Goal({
   goal,
   selectGoal,
   openSidebar,
   checkedTask,
   refresh,
   updatedDeadline,
}: Props) {

   const {
      tasks,
      allTasks,
      checkedTasks,
      visibleTasks,
      remainingTasks,
      daysRemaining,
   } = useGoal({
      goal,
      checkedTask,
      refresh,
      updatedDeadline,
   });

   function handleClick() {
      selectGoal(goal);
      openSidebar();
   }

   const progressValue =
      allTasks.length === 0 ? 0 : (checkedTasks / allTasks.length) * 100;

   const isCompleted =
      allTasks.length > 0 && checkedTasks === allTasks.length;

   return (
      <Card.Root {...styles.cardRoot} onClick={handleClick}>

         <Card.Header {...styles.cardHeader}>
            <Text
               {...styles.goalTitle}
               {...(isCompleted && styles.goalTitleCompleted)}
            >
               {goal.title || "Meta"}
            </Text>

            <Icon {...(isCompleted && styles.goalTitleCompleted)}>
               {isCompleted ? <CircleCheckBig /> : <Ellipsis />}
            </Icon>
         </Card.Header>

         <Flex
            {...styles.deadline.container}
            {...(daysRemaining <= 7 && styles.deadline.completed)}
         >
            <Icon size="sm">
               <Calendar />
            </Icon>

            <Text>{daysRemaining} dias restantes</Text>

            {daysRemaining <= 7 && (
               <Icon size="sm" ml="auto">
                  <CircleAlert />
               </Icon>
            )}
         </Flex>

         <Stack {...styles.tasksStack}>
            {visibleTasks.map((task) => (
               <Task
                  key={task.id}
                  task={task}
                  isChecked={task.isChecked}
               />
            ))}

            {tasks.length > 3 && (
               <Text fontSize="sm" color="gray.500">
                  ..mais {remainingTasks}
               </Text>
            )}
         </Stack>

         <Flex {...styles.progressContainer}>
            <Progress.Root
               {...styles.progressBar.progressRoot}
               value={progressValue}
               size="lg"
            >
               <Progress.Track {...styles.progressBar.progressTrack}>
                  <Progress.Range
                     {...styles.progressBar.range}
                     {...(isCompleted && styles.progressBar.completed)}
                  >
                     {Math.round(progressValue)}%
                  </Progress.Range>
               </Progress.Track>
            </Progress.Root>

            <Text
               {...styles.completedTasks}
               {...(isCompleted && styles.completedAllTasks)}
            >
               <Span {...styles.completedTasksSpan}>
                  {checkedTasks}
               </Span>
               {" / "}
               {allTasks.length}
            </Text>
         </Flex>

      </Card.Root>
   );
}