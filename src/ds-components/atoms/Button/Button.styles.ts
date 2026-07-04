import styled, { css } from "styled-components"

import { colors, motion, opacity, radius, spacing, typography } from "@/foundation"

export type ButtonSize = "large" | "medium" | "small"
export type ButtonVariant = "filled" | "link" | "outlined"

export type StyledButtonProps = {
  $size: ButtonSize
  $variant: ButtonVariant
}

const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
  large: css`
    font-size: ${typography.fontSize.lg}px;
    padding: ${spacing[12]} ${spacing[24]};
  `,
  medium: css`
    font-size: ${typography.fontSize.md}px;
    padding: ${spacing[8]} ${spacing[12]};
  `,
  small: css`
    font-size: ${typography.fontSize.sm}px;
    padding: ${spacing[4]} ${spacing[12]};
  `,
}

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  filled: css`
    background: ${colors.primary[500]};
    border: 1px solid transparent;
    color: ${colors.neutral[0]};

    &:hover:not(:disabled) {
      background: ${colors.primary[600]};
    }
  `,
  link: css`
    background: transparent;
    border: 1px solid transparent;
    color: ${colors.primary[500]};
    padding: 0;

    &:hover:not(:disabled) {
      text-decoration: underline;
    }
  `,
  outlined: css`
    background: ${colors.neutral[0]};
    border: 1px solid ${colors.primary[500]};
    color: ${colors.primary[500]};

    &:hover:not(:disabled) {
      background: ${colors.primary[50]};
    }
  `,
}

export const StyledButton = styled.button<StyledButtonProps>`
  ${(props) => {
    const { $size, $variant } = props

    return css`
      align-items: center;
      border-radius: ${radius.md};
      cursor: pointer;
      display: inline-flex;
      font-family: ${typography.fontFamily.sans};
      font-weight: ${typography.fontWeight.semibold};
      gap: ${spacing[8]};
      justify-content: center;
      transition: background ${motion.duration.fast} ${motion.easing.ease};

      ${sizeStyles[$size]}
      ${variantStyles[$variant]}

      &:disabled {
        cursor: not-allowed;
        opacity: ${opacity.disabled};
      }
    `
  }}
`
