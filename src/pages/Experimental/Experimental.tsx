import { Link } from "react-router-dom"

import { Text } from "@/components/atoms"

import { ExperimentalWrapper } from "./Experimental.styles"

export const Experimental = () => {
  return (
    <ExperimentalWrapper>
      <Text as="h1" size="2xl" weight="bold">
        Página experimental
      </Text>
      <Text as="p" color="secondary">
        Esta página existe para validar a estrutura de rotas do projeto.
      </Text>
      <Text as={Link} color="brand" to="/">
        Voltar para o início
      </Text>
    </ExperimentalWrapper>
  )
}
