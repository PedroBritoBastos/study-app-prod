"use client"

import { IconButton, Dialog, Portal, Button, Flex, Text } from "@chakra-ui/react"
import { Trash2 } from "lucide-react";
import { styles } from "@/src/features/schedule/styles/columnDeleteScheduleDialog";

import { useColumnDeleteScheduleDialog } from "@/features/schedule/hooks/useColumnDeleteScheduleDialog";

import { SchedulesDataType } from "../types/GlobalScheduleData";

type ColumnDeleteScheduleDialogProps = {
   scheduleDay: string;
   numberOfTasks: number;
   scheduleId: string;
}

export function ColumnDeleteScheduleDialog({ scheduleDay, numberOfTasks, scheduleId }: ColumnDeleteScheduleDialogProps) {

   const {
      open,
      handleOpen,
      handleClose,
      handleDelete
   } = useColumnDeleteScheduleDialog(scheduleId);

   return (
      <Dialog.Root
         open={open}
         closeOnInteractOutside={false}
      >
         {/* botão que abre */}
         <IconButton
            {...styles.container}
            size={"md"}
            onClick={handleOpen}
         >
            <Trash2 />
         </IconButton>

         <Portal>
            <Dialog.Backdrop pointerEvents="auto" />

            <Dialog.Positioner
               pointerEvents="auto"
               onClick={(e) => e.stopPropagation()}
            >
               <Dialog.Content onClick={(e) => e.stopPropagation()}>
                  <Dialog.Header justifyContent={"center"}>
                     <Dialog.Title>Excluir cronograma?</Dialog.Title>
                  </Dialog.Header>

                  <Dialog.Body>
                     <Text textAlign={"center"} my={1}>
                        {`Cronograma do dia ${scheduleDay}`}
                     </Text>

                     <Text textAlign={"center"} my={5}>
                        {`Serão excluídas: ${numberOfTasks} tarefas`}
                     </Text>

                     <Flex justifyContent={"flex-end"} gap={3}>
                        {/* botão cancelar */}
                        <Button
                           variant={"outline"}
                           size={"sm"}
                           onClick={handleClose}
                        >
                           Cancelar
                        </Button>

                        {/* botão excluir */}
                        <Button
                           colorPalette={"purple"}
                           size={"sm"}
                           onClick={handleDelete}
                        >
                           Excluir
                        </Button>
                     </Flex>
                  </Dialog.Body>
               </Dialog.Content>
            </Dialog.Positioner>
         </Portal>
      </Dialog.Root>
   )
}