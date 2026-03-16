import { Navbar } from "@/src/components/ui/navbar/Navbar"
import { Flex } from "@chakra-ui/react"

export default async function Home() {
  return <>
    <Flex flex={1} w={"100%"}>
      <Navbar />
    </Flex>
  </>
}
