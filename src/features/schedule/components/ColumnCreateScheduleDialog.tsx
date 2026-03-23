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

type ColumnCreateScheduleDialogProps = {
   open: boolean;
   onOpenDialog: (e: MouseEvent<HTMLElement>) => void;
}

export function ColumnCreateScheduleDialog({
   open,
   onOpenDialog
}: ColumnCreateScheduleDialogProps) {
   return (
      <Dialog.Root size="md" placement="center" motionPreset="slide-in-bottom" open={open}>
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


                        />
                     </Field.Root>

                     <Flex mb={5} alignItems={"center"} justifyContent={"space-between"} gap={4}>
                        <Field.Root flex={3}>
                           <Field.Label

                           >
                              Criar tarefa

                           </Field.Label>
                           <Input
                              type="text"
                              placeholder="nome da tarefa"
                           />
                        </Field.Root>

                        <Field.Root width={"fit-content"} flex={1}>
                           <Field.Label
                           >{"Horário (opcional)"}</Field.Label>
                           <Input
                              type="time"
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
      </Dialog.Root >
   )
}