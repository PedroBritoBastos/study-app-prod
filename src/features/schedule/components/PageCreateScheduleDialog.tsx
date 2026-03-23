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

import { SaveScheduleWarning } from "@/features/schedule/components/SaveScheduleWarning";

import { usePageCreateScheduleDialog } from "@/features/schedule/hooks/usePageCreateScheduleDialog";

export function PageCreateScheduleDialog() {

   const {
      scheduleDay,
      isSaveDialogOpen,
      title,
      executionTime,
      invalid,
      handleScheduleDayInputChange,
      handleCreateSchedule,
      handleTitleInputChange,
      handleExecutionTimeInputChange,
      handleOpenSaveCreateScheduleDialog,
      handleCreateTask
   } = usePageCreateScheduleDialog();

   return (
      <Dialog.Root size="md" placement="center" motionPreset="slide-in-bottom">
         <Dialog.Trigger asChild>
            <Button
               bg={"purple.600"}
               _hover={{ bg: "purple.500" }}
               mb={5}
            >
               <Plus />
               Criar cronograma
            </Button>
         </Dialog.Trigger>
         <Portal>
            <Dialog.Backdrop />

            <Dialog.Positioner >
               {/* adicionar info */}
               <Dialog.Content >
                  <Dialog.Header>
                     <Dialog.Title>Novo cronograma</Dialog.Title>
                     <Dialog.CloseTrigger asChild>
                        <CloseButton
                           size="sm"
                        />
                     </Dialog.CloseTrigger>
                  </Dialog.Header>

                  <Dialog.Body>
                     <Field.Root mb={5}>
                        <Field.Label>Data</Field.Label>
                        <Input
                           type="date"
                           w={"fit-content"}
                           onChange={handleScheduleDayInputChange}
                        />
                     </Field.Root>

                     <Flex mb={5} alignItems={"center"} justifyContent={"space-between"} gap={4}>

                        {/* input de criar tarefa */}
                        <Field.Root flex={3} invalid={invalid}>
                           <Field.Label
                              color={scheduleDay ? "black" : "gray.200"}
                           >
                              Criar tarefa

                           </Field.Label>
                           <Field.ErrorText>Este campo não pode estar vazio.</Field.ErrorText>
                           <Input
                              type="text"
                              placeholder="nome da tarefa"
                              disabled={scheduleDay ? false : true}
                              onChange={handleTitleInputChange}
                              value={title}
                           />
                        </Field.Root>

                        {/* input de horário */}
                        <Field.Root width={"fit-content"} flex={1}>
                           <Field.Label
                              color={scheduleDay ? "black" : "gray.200"}
                           >{"Horário (opcional)"}</Field.Label>
                           <Input
                              type="time"
                              disabled={scheduleDay ? false : true}
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
                           disabled={scheduleDay ? false : true}
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
                           disabled={scheduleDay ? false : true}
                        >
                           Salvar
                        </Button>

                     </Flex>


                     {/* tarefas adicionadas */}
                     <Stack h={"300px"} bg={"gray.200"} borderRadius={"md"} p={3} overflowY={"auto"}>
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