"use client";

import { styles } from "@/features/schedule/styles/task.styles";

import { Flex, Text, IconButton, Icon } from "@chakra-ui/react"
import { Clock, Trash2 } from "lucide-react";

interface Props {
   title: string;
   executionTime?: string;
   taskIndex: number;
   onRemoveTask: (taskIndex: number) => void;
}

export function CreateScheduleDialogTask({
   title,
   executionTime,
   taskIndex,
   onRemoveTask
}: Props) {
   return (
      <Flex {...styles.container}>
         <Text>{title}</Text>

         {/* container do botao de excluir e horario */}
         <Flex gap={3}>
            <Flex {...styles.endtime}>
               <Icon size={"md"}>
                  <Clock />
               </Icon>
               {executionTime ? `${executionTime}h` : "--:--"}</Flex>
            <IconButton size={"xs"} variant={"outline"} onClick={(e) => onRemoveTask(taskIndex)}>
               <Trash2 />
            </IconButton>
         </Flex>
      </Flex>
   )
}