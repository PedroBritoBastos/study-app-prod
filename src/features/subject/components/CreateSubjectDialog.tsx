"use client"

// styles
import { styles } from "@/styles/modal/createSubjectModal.styles";

import { Dialog, Button, Portal, Fieldset, Field, Input, Textarea, CloseButton } from "@chakra-ui/react"
import { Plus } from "lucide-react"

import { useState } from "react"

export function CreateSubjectDialog() {
   const [open, setOpen] = useState<boolean>(false);

   return (
      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
         <Button colorPalette={"purple"} px={6} onClick={(e) => setOpen(prev => !prev)}>
            <Plus />
            Criar
         </Button>
         <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
               <Dialog.Content>
                  <Dialog.Header fontWeight={"bold"} fontSize={"lg"}>Novo conteúdo</Dialog.Header>
                  <Dialog.Body>
                     <Fieldset.Root>
                        <Fieldset.Content>
                           <Field.Root>
                              <Field.Label>Título</Field.Label>
                              <Input type="text" />
                           </Field.Root>
                           <Field.Root>
                              <Field.Label>Conteúdo</Field.Label>
                              <Textarea {...styles.textarea} />
                           </Field.Root>
                        </Fieldset.Content>
                     </Fieldset.Root>
                  </Dialog.Body>
                  <Dialog.Footer>
                     <Dialog.ActionTrigger asChild>
                        <Button colorPalette={"purple"}>Salvar</Button>
                     </Dialog.ActionTrigger>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                     <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
               </Dialog.Content>
            </Dialog.Positioner>
         </Portal>
      </Dialog.Root>
   )
}