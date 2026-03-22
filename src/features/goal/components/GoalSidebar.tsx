"use client"

import { SidebarContainer } from "@/components/ui/sidebar/SidebarContainer";
import { CreateTaskButton } from "@/features/goal/components/CreateTaskButton";
import { GoalSidebarTask } from "@/features/goal/components/GoalSidebarTask";
import { DatePicker } from "@/features/goal/components/DatePicker";
import { Trash } from "lucide-react";

import { GoalType } from "@/features/goal/types/Goal";
import { Text, Stack, Button, Icon, Progress, Span } from "@chakra-ui/react";

import { styles } from "@/styles/sidebar/goalsSidebar.styles";
import scrollbarStyles from "@/styles/sidebar/scroll.module.css";

import { useGoalsSidebar } from "@/features/goal/hooks/useGoalSidebar";

interface Props {
   closeSidebar: () => void;
   goal: GoalType;
   isSidebarOpen?: boolean;
}

export function GoalsSidebar({
   closeSidebar,
   goal,
   isSidebarOpen
}: Props) {

   const {
      allTasks,
      checkedTasks,
      selectedGoalTasks,
      handleDeleteGoalById
   } = useGoalsSidebar(goal, closeSidebar);

   return (
      <SidebarContainer
         header={goal.title}
         closeSidebar={closeSidebar}
         isSidebarOpen={isSidebarOpen}
      >
         <Stack {...styles.container}>

            <DatePicker
               goalId={goal.id}
            />

            <Stack>
               <Text {...styles.statusText}>Em andamento</Text>

               <Stack {...styles.tasksStack} className={scrollbarStyles["scrollbar"]}>
                  {(selectedGoalTasks.filter((task) => !task.isChecked).map(
                     (task) => (
                        <GoalSidebarTask
                           key={task.id}
                           task={task}
                        />
                     )
                  ))}
               </Stack>

               <Stack {...styles.createTaskStack}>
                  <CreateTaskButton
                     goalId={goal.id}
                  />
               </Stack>
            </Stack>

            <Stack>
               <Text {...styles.statusText}>Concluídas</Text>

               <Stack {...styles.tasksStack} className={scrollbarStyles["scrollbar"]}>
                  {(selectedGoalTasks.filter((task) => task.isChecked).map((task) => (
                     <GoalSidebarTask
                        key={task.id}
                        task={task}
                     />
                  )))}
               </Stack>
            </Stack>

            <Stack {...styles.progressContainer}>
               <Text {...styles.statusText}>Progresso</Text>

               <Text
                  {...styles.progressIndicator}
                  {...((checkedTasks / allTasks) === 1 && styles.progressIndicatorCompleted)}
               >
                  {checkedTasks} de {allTasks}
               </Text>

               <Progress.Root value={(checkedTasks / allTasks) * 100}>
                  <Progress.Track {...styles.progressBar.track}>
                     <Progress.Range
                        {...styles.progressBar.range}
                        {...((checkedTasks / allTasks) === 1 && styles.progressBar.completed)}
                     >
                        <Text>
                           {selectedGoalTasks.length > 0 && (Math.round((checkedTasks / allTasks) * 100) || 0)}
                           {selectedGoalTasks.length > 0 && "%"}
                        </Text>
                     </Progress.Range>
                  </Progress.Track>
               </Progress.Root>

               <Text {...styles.statusIndicator}>
                  Status:{" "}
                  <Span
                     {...(checkedTasks / allTasks === 1
                        ? styles.progressIndicatorCompleted
                        : styles.statusIndicatorInProgress)}
                  >
                     {(checkedTasks / allTasks === 1 ? "concluído" : "em andamento")}
                  </Span>
               </Text>
            </Stack>

            <Button {...styles.deleteButton} onClick={handleDeleteGoalById}>
               <Icon size="sm">
                  <Trash />
               </Icon>
               Excluir meta
            </Button>

         </Stack>
      </SidebarContainer>
   );
}