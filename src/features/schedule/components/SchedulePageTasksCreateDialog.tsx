"use client"

import { Dialog, Button, IconButton, Portal, Field, Input, Flex, Presence } from "@chakra-ui/react"
import { Plus } from "lucide-react"

import { useSchedulePageTasksCreateDialog } from "@/features/schedule/hooks/useSchedulePageTasksCreateDialog"

import { ScheduleTaskType } from "@/features/schedule/types/ScheduleTask"
import { parseTimeToDate } from "@/src/utilities/dateUtils"

type SchedulePageTasksCreateDialogProps = {
   scheduleId: string;
   onAddScheduleTask: (scheduleTask: ScheduleTaskType) => void;
}

export function SchedulePageTasksCreateDialog({ scheduleId, onAddScheduleTask }: SchedulePageTasksCreateDialogProps) {
   const {
      title,
      executionTime,
      open,
      invalid,
      handleOpenDialog,
      handleExecutionTimeInputChange,
      handleTitleInputChange,
      handleCancel,
      handleCreateScheduleTask
   } = useSchedulePageTasksCreateDialog(scheduleId, onAddScheduleTask);

   return (
      <Dialog.Root
         open={open}
      >
         <IconButton
            size={"xs"}
            colorPalette={"purple"}
            onClick={handleOpenDialog}
         >
            <Plus />
         </IconButton>

         <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
               <Dialog.Content>
                  <Dialog.Header>
                     <Dialog.Title>Nova tarefa</Dialog.Title>
                  </Dialog.Header>

                  <Dialog.Body>
                     <Field.Root invalid={invalid}>
                        <Field.Label>Nome da tarefa</Field.Label>
                        <Field.ErrorText>Campo obrigatório</Field.ErrorText>
                        <Input
                           type="text"
                           mb={6}
                           value={title}
                           onChange={handleTitleInputChange}
                        />
                     </Field.Root>

                     <Field.Root>
                        <Field.Label>Horário (opcional)</Field.Label>
                        <Input
                           type="time"
                           mb={6}
                           w="fit-content"
                           value={executionTime}
                           onChange={handleExecutionTimeInputChange}
                        />
                     </Field.Root>

                     <Flex gap={3} justifyContent="flex-end">
                        <Button variant="outline"
                           onClick={handleCancel}
                        >
                           Cancelar
                        </Button>

                        <Button colorPalette="purple" onClick={handleCreateScheduleTask}>
                           Salvar
                        </Button>
                     </Flex>
                  </Dialog.Body>
               </Dialog.Content>
            </Dialog.Positioner>
         </Portal>
      </Dialog.Root>
   )
}