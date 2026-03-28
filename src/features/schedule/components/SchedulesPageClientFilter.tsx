"use client";

import { Select, Portal, createListCollection, IconButton, Text, Input, Icon } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, ListFilter } from "lucide-react";
import { SchedulesDataType } from "@/features/schedule/types/GlobalScheduleData";

import { useSchedulesPageClientFilter } from "@/features/schedule/hooks/useSchedulesPageClientFilter";

const options = createListCollection({
   items: [
      { label: "Sem filtro", value: "none" },
      { label: "Mês", value: "month" },
      { label: "Data", value: "date" },
      { label: "Cronogramas", value: "all" }
   ],
})

const months = createListCollection({
   items: [
      { label: "Janeiro", value: "janeiro" },
      { label: "Fevereiro", value: "fevereiro" },
      { label: "Março", value: "março" },
      { label: "Abril", value: "abril" },
      { label: "Maio", value: "maio" },
      { label: "Junho", value: "junho" },
      { label: "Julho", value: "julho" },
      { label: "Agosto", value: "agosto" },
      { label: "Setembro", value: "setembro" },
      { label: "Outubro", value: "outubro" },
      { label: "Novembro", value: "novembro" },
      { label: "Dezembro", value: "dezembro" }
   ],
})

type SchedulesPageClientFilterProps = {
   serverData: SchedulesDataType[];
}

export function SchedulesPageClientFilter({ serverData }: SchedulesPageClientFilterProps) {

   const {
      openMonthInput,
      openDateInput,
      year,
      date,
      handleFilter,
      handleSelectMonth,
      handleNextYear,
      handlePrevYear,
      handleDateInputChange,
   } = useSchedulesPageClientFilter(serverData);

   return (
      <>
         <Select.Root
            collection={options}
            width="200px"
            variant={"outline"}
            onValueChange={handleFilter}
            defaultValue={["none"]}
         >
            <Select.HiddenSelect />
            <Select.Control>
               <Select.Trigger display={"flex"} justifyContent={"start"} width={"200px"} >
                  <Icon size={"sm"}>
                     <ListFilter />
                  </Icon>
                  <Select.ValueText />
               </Select.Trigger>
               <Select.IndicatorGroup>
                  <Select.Indicator />
               </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
               <Select.Positioner>
                  <Select.Content>
                     {options.items.map((option) => (
                        <Select.Item item={option} key={option.value}>
                           {option.label}
                           <Select.ItemIndicator />
                        </Select.Item>
                     ))}
                  </Select.Content>
               </Select.Positioner>
            </Portal>
         </Select.Root>
         {
            openMonthInput && (
               <>
                  <Select.Root
                     collection={months}
                     width="200px"
                     variant={"outline"}
                     onValueChange={handleSelectMonth}
                  >
                     <Select.HiddenSelect />
                     <Select.Control>
                        <Select.Trigger>
                           <Select.ValueText placeholder="Selecione o mês" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                           <Select.Indicator />
                        </Select.IndicatorGroup>
                     </Select.Control>
                     <Portal>
                        <Select.Positioner>
                           <Select.Content>
                              {months.items.map((option) => (
                                 <Select.Item item={option} key={option.value}>
                                    {option.label}
                                    <Select.ItemIndicator />
                                 </Select.Item>
                              ))}
                           </Select.Content>
                        </Select.Positioner>
                     </Portal>
                  </Select.Root>
                  <IconButton onClick={handlePrevYear} _hover={{ bg: "purple.200" }} variant={"ghost"} rounded={"full"} colorPalette={"purple"} size={"xs"}>
                     <ChevronLeft />
                  </IconButton>
                  <Text mt={1}>{year}</Text>
                  <IconButton onClick={handleNextYear} _hover={{ bg: "purple.200" }} variant={"ghost"} rounded={"full"} colorPalette={"purple"} size={"xs"}>
                     <ChevronRight />
                  </IconButton>
               </>
            )
         }
         {
            openDateInput && (
               <Input type="date" value={date} onChange={handleDateInputChange} />
            )
         }
      </>
   )
}