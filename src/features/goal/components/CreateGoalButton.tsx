"use client"

import { Card, Text, Field, Input, Button, Flex } from "@chakra-ui/react";
import { Plus } from "lucide-react";

import { styles } from "@/styles/goals/createButton.styles";

import { useCreateGoalButton } from "@/features/goal/hooks/useCreateGoalButton";

export function CreateGoalButton() {
   const {
      createMode,
      setCreateMode,
      goalTitle,
      setGoalTitle,
      deadline,
      setDeadline,
      handleCreate,
      handleCancel,
   } = useCreateGoalButton();

   return (
      <Card.Root
         {...styles.cardRoot}
         {...(createMode && styles.createMode)}
         onClick={() => setCreateMode(true)}
      >
         {createMode ? (
            <>
               <Field.Root>
                  <Field.Label {...styles.createLabel}>Título</Field.Label>
                  <Input
                     {...styles.input}
                     type="text"
                     value={goalTitle}
                     onChange={(e) => setGoalTitle(e.target.value)}
                  />

                  <Field.Label {...styles.createLabel}>Prazo</Field.Label>
                  <Input
                     type="date"
                     value={deadline}
                     onChange={(e) => setDeadline(e.target.value)}
                  />
               </Field.Root>

               <Flex {...styles.createModeButtonContainer}>
                  <Button
                     {...styles.createModeCancelButton}
                     onClick={handleCancel}
                  >
                     Cancelar
                  </Button>

                  <Button
                     {...styles.createModeAddButton}
                     onClick={handleCreate}
                  >
                     Adicionar
                  </Button>
               </Flex>
            </>
         ) : (
            <>
               <Plus {...styles.icon} />
               <Text {...styles.text}> Criar nova meta</Text>
            </>
         )}
      </Card.Root>
   );
}