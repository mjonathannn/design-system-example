import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { Text } from "@/components/atoms"
import type { ViaCepAddress } from "@/models"
import { getAddressByCep } from "@/services"

import { ExperimentalWrapper } from "./Experimental.styles"

export const Experimental = () => {
  const [address, setAddress] = useState<ViaCepAddress | null>(null)

  useEffect(() => {
    getAddressByCep("01310-100").then(setAddress).catch(console.error)
  }, [])

  return (
    <ExperimentalWrapper>
      <Text as="h1" size="2xl" weight="bold">
        Página experimental
      </Text>
      <Text as="p" color="secondary">
        Esta página existe para validar a estrutura de rotas do projeto.
      </Text>
      <Text as="p" color="secondary">
        Chamada experimental à API pública do ViaCEP, validando a estrutura de src/services com axios:
      </Text>
      {address && (
        <Text as="p">
          {address.logradouro}, {address.bairro} — {address.localidade}/{address.uf}
        </Text>
      )}
      <Text as={Link} color="brand" to="/">
        Voltar para o início
      </Text>
    </ExperimentalWrapper>
  )
}
