"use client"

import {
   Button,
   CloseButton,
   Dialog,
   Portal,
   Field,
   Input,
   Stack,
   Flex,
   Span
} from "@chakra-ui/react"
import { Plus } from "lucide-react"
import { MouseEvent } from "react"

import { SaveScheduleWarning } from "@/features/schedule/components/SaveScheduleWarning";
import { CreateScheduleDialogTask } from "@/features/schedule/components/CreateScheduleDialogTask";

import { useColumnCreateScheduleDialog } from "@/features/schedule/hooks/useColumnCreateScheduleDialog";

type ColumnCreateScheduleDialogProps = {
   openDialog: boolean;
   onOpenDialog: (e: MouseEvent<HTMLElement>) => void;
   day: string;
}

export function ColumnCreateScheduleDialog({
   openDialog,
   onOpenDialog,
   day
}: ColumnCreateScheduleDialogProps) {

   const {
      isSaveDialogOpen,
      title,
      executionTime,
      invalid,
      tasks,
      handleCreateSchedule,
      handleTitleInputChange,
      handleExecutionTimeInputChange,
      handleOpenSaveCreateScheduleDialog,
      handleCreateTask,
      handleRemoveTask
   } = useColumnCreateScheduleDialog(day);

   return (
      <Dialog.Root size="md" placement="center" motionPreset="slide-in-bottom" open={openDialog}>
         <Portal>
            <Dialog.Backdrop />

            <Dialog.Positioner >
               {/* adicionar info */}
               <Dialog.Content onClick={(e: MouseEvent<HTMLElement>) => e.stopPropagation()}>
                  <Dialog.Header>
                     <Dialog.Title>Novo cronograma</Dialog.Title>
                     <Dialog.CloseTrigger asChild>
                        <CloseButton
                           size="sm"
                           onClick={onOpenDialog}
                        />
                     </Dialog.CloseTrigger>
                  </Dialog.Header>

                  <Dialog.Body>
                     <Field.Root mb={5}>
                        <Field.Label>Data</Field.Label>
                        <Input
                           type="date"
                           w={"fit-content"}
                           value={day}
                           disabled
                        />
                     </Field.Root>

                     <Flex mb={5} alignItems={"center"} justifyContent={"space-between"} gap={4}>

                        {/* input de criar tarefa */}
                        <Field.Root flex={3} invalid={invalid}>
                           <Field.Label>
                              Criar tarefa
                           </Field.Label>
                           <Field.ErrorText>Este campo não pode estar vazio.</Field.ErrorText>
                           <Input
                              type="text"
                              placeholder="nome da tarefa"
                              onChange={handleTitleInputChange}
                              value={title}
                           />
                        </Field.Root>

                        {/* input de horário */}
                        <Field.Root width={"fit-content"} flex={1}>
                           <Field.Label>{"Horário (opcional)"}</Field.Label>
                           <Input
                              type="time"
                              onChange={handleExecutionTimeInputChange}
                              value={executionTime}
                           />
                        </Field.Root>
                     </Flex>

                     <Flex
                        mb={5}
                        alignItems={"center"}
                        gap={2}
                     >
                        {/* Botão para adicionar tarefas */}
                        <Button
                           bg={"purple.600"}
                           _hover={{ bg: "purple.500" }}
                           size="sm"
                           flex={1}
                           onClick={handleCreateTask}
                        >
                           Adicionar tarefa
                        </Button>

                        {/* criar cronograma */}
                        <Button
                           bg={"white"}
                           _hover={{ bg: "gray.100" }}
                           color={"purple.700"}
                           size="sm"
                           flex={1}
                           boxShadow={"md"}
                           onClick={handleCreateSchedule}
                        >
                           Salvar
                        </Button>

                     </Flex>


                     {/* tarefas adicionadas */}
                     <Stack h={"300px"} bg={"gray.200"} borderRadius={"md"} p={3} overflowY={"auto"}>
                        {tasks.map((task, index) => (
                           <CreateScheduleDialogTask
                              key={index}
                              title={task.title}
                              executionTime={task.executionTime}
                              taskIndex={index}
                              onRemoveTask={handleRemoveTask}
                           />
                        ))}
                     </Stack>
                  </Dialog.Body>

               </Dialog.Content>
            </Dialog.Positioner>
         </Portal>

         {/* Warning caso não tenham tarefas criadas ao tentar salvar */}
         <SaveScheduleWarning
            open={isSaveDialogOpen}
            onClose={handleOpenSaveCreateScheduleDialog}
         />
      </Dialog.Root >
   )
}