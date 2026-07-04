import styled from "styled-components"

import { colors, radius, spacing, typography } from "@/foundation"

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
`

export const StyledInput = styled.input`
  background: ${colors.neutral[0]};
  border-radius: ${radius.sm};
  border: 1px solid ${colors.neutral[300]};
  color: ${colors.neutral[900]};
  font-family: ${typography.fontFamily.sans};
  font-size: ${typography.fontSize.md}px;
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
