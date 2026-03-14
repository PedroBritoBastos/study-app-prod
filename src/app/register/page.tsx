"use client";

// styles
import { styles } from "@/styles/register/registerPage.styles";

import { Stack, Heading, Text, Fieldset, Button, Flex } from "@chakra-ui/react";
import { Input } from "@/src/components/ui/form/Input";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { register } from "@/src/features/auth/actions/register";

export default function RegisterPage() {
   const router = useRouter();

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [error, setError] = useState("");

   const handleSubmit = async () => {
      setError("");

      try {
         await register(username, password);
         router.replace("/login");
      } catch (error) {
         if (error instanceof Error) {
            setError(error.message);
         } else {
            setError("Erro inesperado ao registrar.");
         }
      }
   };

   return (
      <Stack {...styles.container}>
         <Fieldset.Root {...styles.fieldset}>
            <Heading {...styles.heading}>Cadastro</Heading>

            <Text>Usuário</Text>
            <Input
               type="text"
               name="username"
               placeholder="Username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
            />

            <Text>Senha</Text>
            <Input
               type="password"
               name="password"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />

            <Text>Confirmação de senha</Text>
            <Input
               type="password"
               name="confirmPassword"
               placeholder="Password"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
            />
         </Fieldset.Root>

         {error && (
            <Text color="red.400" textAlign="center" mb={3}>
               {error}
            </Text>
         )}

         <Flex {...styles.buttons}>
            <Button {...styles.submitButton} onClick={handleSubmit}>
               Cadastrar
            </Button>

            <Button
               {...styles.registerButton}
               onClick={() => router.push("/login")}
            >
               Fazer Login
            </Button>
         </Flex>
      </Stack>
   );
}