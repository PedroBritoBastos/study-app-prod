"use client"

import {
   Dialog,
   Button,
   Portal,
   CloseButton,
   Text
} from "@chakra-ui/react"

import { useState } from "react"

import { deleteSubjectByIdAction } from "@/features/subject/actions/deleteSubjectById";

type DeleteSubjectDialogProps = {
   id: string;
   onCloseSidebar: () => void;
}

export function DeleteSubjectDialog({
   id,
   onCloseSidebar
}: DeleteSubjectDialogProps) {
   const [open, setOpen] = useState<boolean>(false);

   const handleDeleteSubject = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      try {
         await deleteSubjectByIdAction(id);
         onCloseSidebar();
         setOpen(false);
      } catch (error) {
         if (error instanceof Error) {
            console.log(error)
         } else {
            console.log(error)
         }
      }
   };

   return (
      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
         <Button colorPalette={"purple"} px={6} onClick={() => setOpen(prev => !prev)}>
            Excluir
         </Button>

         <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
               <Dialog.Content as="form" onSubmit={handleDeleteSubject}>
                  <Dialog.Header fontWeight={"bold"} fontSize={"lg"} justifyContent={"center"}>
                     <Dialog.Title>Excluir matéria</Dialog.Title>
                  </Dialog.Header>

                  <Dialog.Body>
                     <Text textAlign={"center"}>Tem certeza que quer excluir essa matéria?</Text>
                  </Dialog.Body>

                  <Dialog.Footer>
                     <Dialog.ActionTrigger asChild>
                        <Button variant={"outline"}>Cancelar</Button>
                     </Dialog.ActionTrigger>
                     <Button type="submit" colorPalette={"purple"}>
                        Excluir
                     </Button>
                  </Dialog.Footer>

                  <Dialog.CloseTrigger asChild>
                     <CloseButton size="sm" />
                  </Dialog.CloseTrigger>

               </Dialog.Content>
            </Dialog.Positioner>
         </Portal>
      </Dialog.Root>
   );
}