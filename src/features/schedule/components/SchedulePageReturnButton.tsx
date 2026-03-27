"use client"

import { IconButton } from "@chakra-ui/react"
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function SchedulePageReturnButton() {
   const router = useRouter();

   const handleGoBack = () => {
      router.replace("/schedules");
   }

   return <IconButton onClick={handleGoBack} w={"fit-content"} bg={"purple.700"} _hover={{ bg: "purple.600" }}>
      <ArrowLeft />
   </IconButton>
}