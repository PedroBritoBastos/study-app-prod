"use client";

// styles
import { styles } from "@/styles/login/loginPage.styles";

// components
import { Input } from "@/src/components/ui/form/Input";
import { Stack, Heading, Span, Button, Flex } from "@chakra-ui/react";
import { Suspense } from "react";
import Loading from "./loading";

export default function LoginPage() {
   return (
      <Suspense fallback={<Loading />}>
         <Stack {...styles.container}>

            {/* titulo da pagina de login */}
            <Heading {...styles.heading}><Span {...styles.span}>Study</Span> App</Heading>
            <form>
               {/* legenda de login */}
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
               <Flex {...styles.submitButtonContainer}>
                  <Button {...styles.submitButton}>Log in</Button>
                  <Button {...styles.registerButton}>Cadastrar</Button>
               </Flex>
            </form>
         </Stack>
      </Suspense>
   );
}