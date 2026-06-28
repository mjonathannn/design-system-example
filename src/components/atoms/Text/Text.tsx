import type { ElementType, ReactNode } from "react"

import { colors } from "../../../foundation"
import type { TextAlign, TextSize, TextWeight } from "./Text.styles"
import { StyledText } from "./Text.styles"

type TextColor = "brand" | "danger" | "default" | "info" | "inverse" | "muted" | "secondary" | "success" | "warning"

const colorMap: Record<TextColor, string> = {
  brand: colors.primary[500],
  danger: colors.danger[500],
  default: colors.neutral[900],
  info: colors.info[500],
  inverse: colors.neutral[0],
  muted: colors.neutral[500],
  secondary: colors.neutral[700],
  success: colors.success[500],
  warning: colors.warning[500],
}

export type TextProps = {
  children: ReactNode
  align?: TextAlign
  as?: ElementType
  className?: string
  color?: TextColor
  size?: TextSize
  weight?: TextWeight
}

const Text = (props: TextProps) => {
  const { align, as, children, className, color = "default", size = "md", weight = "regular" } = props

  return (
    <StyledText as={as} className={className} $size={size} $weight={weight} $color={colorMap[color]} $align={align}>
      {children}
    </StyledText>
  )
}

export default Text
