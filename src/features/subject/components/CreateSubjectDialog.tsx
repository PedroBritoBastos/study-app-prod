"use client"

// styles
import { styles } from "@/styles/modal/createSubjectModal.styles";

import {
   Dialog,
   Button,
   Portal,
   Fieldset,
   Field,
   Input,
   Textarea,
   CloseButton
} from "@chakra-ui/react"

import { Plus } from "lucide-react"
import { useState } from "react"

import { createSubjectAction } from "@/features/subject/actions/createSubject";

export function CreateSubjectDialog() {
   const [open, setOpen] = useState<boolean>(false);

   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [titleError, setTitleError] = useState(false);
   const [contentError, setContentError] = useState(false);
   const [error, setError] = useState("");

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const isTitleEmpty = title.trim() === "";
      const isContentEmpty = content.trim() === "";

      setTitleError(isTitleEmpty);
      setContentError(isContentEmpty);

      if (isTitleEmpty || isContentEmpty) return;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      try {
         await createSubjectAction(formData);
         setError("");
         setTitle("");
         setContent("");
         setOpen(false);
      } catch (error) {
         if (error instanceof Error) {
            setError(error.message);
            console.log(error)
         } else {
            setError("Erro inesperado ao criar conteúdo.");
            console.log(error)
         }
      }
   };

   return (
      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
         <Button colorPalette={"purple"} px={6} onClick={() => setOpen(prev => !prev)}>
            <Plus />
            Criar
         </Button>

         <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
               <Dialog.Content as="form" onSubmit={handleSubmit}>

                  <Dialog.Header fontWeight={"bold"} fontSize={"lg"}>
                     Novo conteúdo
                  </Dialog.Header>

                  <Dialog.Body>
                     <Fieldset.Root>
                        <Fieldset.Content gap={8}>

                           <Field.Root invalid={titleError}>
                              <Field.Label>Título</Field.Label>

                              <Input
                                 type="text"
                                 value={title}
                                 onChange={(e) => setTitle(e.target.value)}
                              />

                              <Field.ErrorText>
                                 O título não pode estar vazio
                              </Field.ErrorText>
                           </Field.Root>

                           <Field.Root invalid={contentError}>
                              <Field.Label>Conteúdo</Field.Label>

                              <Textarea
                                 {...styles.textarea}
                                 value={content}
                                 onChange={(e) => setContent(e.target.value)}
                              />

                              <Field.ErrorText>
                                 O conteúdo não pode estar vazio
                              </Field.ErrorText>
                           </Field.Root>

                        </Fieldset.Content>
                     </Fieldset.Root>
                  </Dialog.Body>

                  <Dialog.Footer>
                     <Button type="submit" colorPalette={"purple"}>
                        Salvar
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