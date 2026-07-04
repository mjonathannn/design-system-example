import { Link } from "react-router-dom"

import { Text } from "@/components/atoms"

import { HomeWrapper } from "./Home.styles"

export const Home = () => {
  return (
    <HomeWrapper>
      <Text as="h1" size="2xl" weight="bold">
        Olá, mundo!
      </Text>
      <Text as={Link} color="brand" to="/experimental">
        Ver página experimental
      </Text>
    </HomeWrapper>
  )
}
