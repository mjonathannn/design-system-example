export type MaskType = "cep" | "cnpj" | "cpf" | "creditCard" | "expiry" | "phone"

const maxDigits: Record<MaskType, number> = {
  cep: 8,
  cnpj: 14,
  cpf: 11,
  creditCard: 16,
  expiry: 4,
  phone: 11,
}

const formatCep = (digits: string): string => {
  const part1 = digits.slice(0, 5)
  const part2 = digits.slice(5, 8)

  return part2 ? `${part1}-${part2}` : part1
}

const formatCnpj = (digits: string): string => {
  const part1 = digits.slice(0, 2)
  const part2 = digits.slice(2, 5)
  const part3 = digits.slice(5, 8)
  const part4 = digits.slice(8, 12)
  const part5 = digits.slice(12, 14)

  let result = part1
  if (part2) result += `.${part2}`
  if (part3) result += `.${part3}`
  if (part4) result += `/${part4}`
  if (part5) result += `-${part5}`

  return result
}

const formatCpf = (digits: string): string => {
  const part1 = digits.slice(0, 3)
  const part2 = digits.slice(3, 6)
  const part3 = digits.slice(6, 9)
  const part4 = digits.slice(9, 11)

  let result = part1
  if (part2) result += `.${part2}`
  if (part3) result += `.${part3}`
  if (part4) result += `-${part4}`

  return result
}

// Splits into groups of 4 (standard 16-digit Visa/Mastercard numbering); doesn't handle Amex's 4-6-5 grouping.
const formatCreditCard = (digits: string): string => digits.replace(/(\d{4})(?=\d)/g, "$1 ")

const formatExpiry = (digits: string): string => {
  const part1 = digits.slice(0, 2)
  const part2 = digits.slice(2, 4)

  return part2 ? `${part1}/${part2}` : part1
}

// The local number is 8 digits (landline, dash after 4) or 9 digits (mobile, dash after 5) -
// which one it is can only be told apart once enough digits have been typed.
const formatPhone = (digits: string): string => {
  if (!digits) return ""

  const ddd = digits.slice(0, 2)
  if (digits.length <= 2) return `(${ddd}`

  const local = digits.slice(2)
  const splitIndex = local.length > 8 ? 5 : 4
  const firstPart = local.slice(0, splitIndex)
  const secondPart = local.slice(splitIndex)

  return secondPart ? `(${ddd}) ${firstPart}-${secondPart}` : `(${ddd}) ${firstPart}`
}

const formatters: Record<MaskType, (digits: string) => string> = {
  cep: formatCep,
  cnpj: formatCnpj,
  cpf: formatCpf,
  creditCard: formatCreditCard,
  expiry: formatExpiry,
  phone: formatPhone,
}

export const applyMask = (mask: MaskType, rawValue: string): string => {
  const digits = rawValue.replace(/\D/g, "").slice(0, maxDigits[mask])

  return formatters[mask](digits)
}
