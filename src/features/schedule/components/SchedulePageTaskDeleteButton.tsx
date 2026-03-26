"use client"

import { IconButton } from "@chakra-ui/react"
import { Trash } from "lucide-react"

type SchedulePageTaskDeleteButtonProps = {
   isChecked: boolean;
   taskId: string;
   onDeleteTask: (taskId: string) => void;
}

export function SchedulePageTaskDeleteButton({
   isChecked,
   taskId,
   onDeleteTask
}: SchedulePageTaskDeleteButtonProps) {

   return (
      <IconButton
         size={"sm"}
         bg={isChecked ? "gray.100" : "white"}
         color={"purple.700"}
         boxShadow={"md"}
         _hover={{ bg: "purple.600", color: "white" }}
         onClick={() => onDeleteTask(taskId)}
      >
         <Trash />
      </IconButton>
   )
}