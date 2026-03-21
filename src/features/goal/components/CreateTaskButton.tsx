"use client"

import { Button, Stack, Field, Input, Flex } from "@chakra-ui/react";
import { Plus } from "lucide-react";

import { styles } from "@/styles/button/createTaskButton.styles";

import { useState } from "react";
import { useGoalContext } from "../hooks/useGoalContext";

import { createTaskAction } from "@/features/goal/actions/tasks/createTask";


interface Props {
   goalId: string;
}

export function CreateTaskButton({ goalId }: Props) {
   const [open, setOpen] = useState(false);
   const [title, setTitle] = useState("");

   // recuperando dados do context
   const { addTaskToSelectedGoal } = useGoalContext();

   async function handleCreateTask() {
      try {
         // criando formData para action
         const formData = new FormData();
         formData.append("title", title);
         formData.append("goalId", goalId);

         // chamando a action e adicionando a resposta para atualizar o componente
         const createdTask = await createTaskAction(formData);
         addTaskToSelectedGoal(createdTask);

         // limpando o componente
         setTitle("");
         setOpen(!open);
      } catch (error) {
         if (error instanceof Error) {
            console.log(error.message);
         } else {
            console.log("Erro desconhecido ao criar tarefa");
         }
      }
   }

   return <Stack {...(open && styles.open)}>
      <Button {...styles.button} onClick={() => setOpen(!open)}>
         <Plus />
         Nova Tarefa
      </Button>

      {open &&
         <Stack {...styles.createTaskContainer}>
            <Field.Root>
               <Field.Label {...styles.createTaskLabel}>Título</Field.Label>
               <Flex {...styles.createTaskInputContainer}>
                  <Input {...styles.createTaskInput} value={title} onChange={(e) => setTitle(e.target.value)} />
                  <Button {...styles.createTaskAddButton} onClick={handleCreateTask}>Adicionar</Button>
               </Flex>
            </Field.Root>
         </Stack>
      }
   </Stack>
}