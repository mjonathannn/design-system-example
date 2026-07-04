import styled, { css } from "styled-components"

import { colors, radius, spacing, typography } from "@/foundation"

export type TagColor =
  | "brand"
  | "danger"
  | "default"
  | "info"
  | "inverse"
  | "muted"
  | "secondary"
  | "success"
  | "warning"

type TagColorConfig = {
  background: string
  color: string
  border?: string
}

// inverse is the only one that needs a visible border - a white background would otherwise
// blend into the page behind it, unlike every other color which is a solid, self-contained fill.
export const tagColorMap: Record<TagColor, TagColorConfig> = {
  brand: { background: colors.primary[500], color: colors.neutral[0] },
  danger: { background: colors.danger[500], color: colors.neutral[0] },
  default: { background: colors.neutral[900], color: colors.neutral[0] },
  info: { background: colors.info[500], color: colors.neutral[0] },
  inverse: { background: colors.neutral[0], border: `1px solid ${colors.neutral[200]}`, color: colors.neutral[900] },
  muted: { background: colors.neutral[200], color: colors.neutral[700] },
  secondary: { background: colors.neutral[600], color: colors.neutral[0] },
  success: { background: colors.success[500], color: colors.neutral[0] },
  warning: { background: colors.warning[500], color: colors.neutral[0] },
}

export type StyledTagProps = {
  $background: string
  $color: string
  $border?: string
}

export const StyledTag = styled.span<StyledTagProps>`
  ${(props) => {
    const { $background, $border, $color } = props

    return css`
      align-items: center;
      background: ${$background};
      border: ${$border ?? "1px solid transparent"};
      border-radius: ${radius.full};
      color: ${$color};
      display: inline-flex;
      font-size: ${typography.fontSize.sm}px;
      font-weight: ${typography.fontWeight.medium};
      gap: ${spacing[8]};
      justify-content: center;
      padding: ${spacing[4]} ${spacing[12]};
      white-space: nowrap;
    `
  }}
`
