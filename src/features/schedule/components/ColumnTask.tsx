"use client";

import { Text } from "@chakra-ui/react"

export function ColumnTask({ title }: { title: string }) {
   return <Text {...taskStyles.task}>{title}</Text>
}