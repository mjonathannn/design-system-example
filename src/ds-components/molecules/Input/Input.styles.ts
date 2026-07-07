import styled, { css } from "styled-components"

import { colors, radius, shadows, spacing, typography } from "@/foundation"

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
`

export type StyledInputProps = {
  $elevated?: boolean
}

export const StyledInput = styled.input<StyledInputProps>`
  ${(props) => {
    const { $elevated } = props

    return css`
      background: ${colors.neutral[0]};
      border-radius: ${radius.lg};
      border: 1px solid ${colors.neutral[300]};
      box-shadow: ${$elevated ? shadows.sm : shadows.none};
      color: ${colors.neutral[900]};
      font-family: ${typography.fontFamily.sans};
      font-size: ${typography.fontSize.sm}px;
      padding: ${spacing[8]} ${spacing[12]};
      width: 100%;

      &::placeholder {
        color: ${colors.neutral[500]};
      }

      &:focus {
        border-color: ${colors.primary[500]};
        outline: none;
      }

      &:disabled {
        background: ${colors.neutral[50]};
        color: ${colors.neutral[500]};
        cursor: not-allowed;
      }
    `
  }}
`
