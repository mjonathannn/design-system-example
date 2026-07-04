import axios from "axios"

import { stripNonDigits } from "@/utils/formats"

export type ViaCepAddress = {
  bairro: string
  cep: string
  localidade: string
  logradouro: string
  uf: string
  erro?: boolean
}

// Experimental call validating the src/services structure with axios against a real public API
// (ViaCEP - a free Brazilian postal code lookup, no auth required).
export const getAddressByCep = async (cep: string): Promise<ViaCepAddress> => {
  const digits = stripNonDigits(cep)
  const response = await axios.get<ViaCepAddress>(`https://viacep.com.br/ws/${digits}/json/`)

  return response.data
}
