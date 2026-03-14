"use client";

// styles
import { styles } from "@/styles/login/loginPage.styles";

// components
import { Input } from "@/src/components/ui/form/Input";
import { Stack, Heading, Span, Button, Flex, Text } from "@chakra-ui/react";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";

import Loading from "./loading";

import { login } from "@/src/features/auth/actions/login";

export default function LoginPage() {
   const router = useRouter();
   const [error, setError] = useState("");

   const handleSubmit = async (formData: FormData) => {
      setError("");

      try {
         await login(formData);
         router.push("/");
         router.refresh();
      } catch (err) {
         if (err instanceof Error) {
            setError(err.message);
         } else {
            setError("Erro inesperado ao fazer login.");
         }
      }
   };

   return (
      <Suspense fallback={<Loading />}>
         <Stack {...styles.container}>
            <Heading {...styles.heading}>
               <Span {...styles.span}>Study</Span> App
            </Heading>

            <form
               action={(formData) => {
                  handleSubmit(formData);
               }}
            >
               <Heading {...styles.loginHeading}>Log In</Heading>

               <Input
                  type="text"
                  name="username"
                  placeholder="Username"
               />

               <Input
                  type="password"
                  name="password"
                  placeholder="Password"
               />

               {error && (
                  <Text color="red.400" textAlign="center" mb={3}>
                     {error}
                  </Text>
               )}

               <Flex {...styles.submitButtonContainer}>
                  <Button {...styles.submitButton} type="submit">
                     Log in
                  </Button>

                  <Button
                     {...styles.registerButton}
                     type="button"
                     onClick={() => router.push("/register")}
                  >
                     Cadastrar
                  </Button>
               </Flex>
            </form>
         </Stack>
      </Suspense>
   );
}