"use client"

import { Checkbox } from "@chakra-ui/react"

interface Props {
   onCheck: () => void;
}

export function SchedulePageTaskCheckButton({ onCheck }: Props) {
   return (
      <Checkbox.Root variant={"solid"} colorPalette={"purple"} bg={"gray.300"} size={"lg"} onCheckedChange={onCheck}>
         <Checkbox.HiddenInput />
         <Checkbox.Control />
      </Checkbox.Root>
   )
}