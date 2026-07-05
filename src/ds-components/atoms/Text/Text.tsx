import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from "react"

import { colors } from "@/foundation"

import { useTooltip } from "../Tooltip"
import type { TextAlign, TextFontSize, TextFontWeight } from "./Text.styles"
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

type TextOwnProps<C extends ElementType> = {
  children: ReactNode
  align?: TextAlign
  as?: C
  bold?: boolean
  className?: string
  color?: TextColor
  fontSize?: TextFontSize
  fontWeight?: TextFontWeight
  semibold?: boolean
  style?: CSSProperties
  tooltip?: string
}

export type TextProps<C extends ElementType = "p"> = TextOwnProps<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof TextOwnProps<C>>

export const Text = <C extends ElementType = "p">(props: TextProps<C>) => {
  const {
    align,
    as,
    bold,
    children,
    className,
    color = "default",
    fontSize = "md",
    fontWeight = "regular",
    semibold,
    style,
    tooltip,
    ...rest
  } = props

  const { tooltipElement, tooltipHandlers } = useTooltip(tooltip)

  let resolvedFontWeight: TextFontWeight = fontWeight
  if (bold) resolvedFontWeight = "bold"
  else if (semibold) resolvedFontWeight = "semibold"

  return (
    <>
      <StyledText
        $align={align}
        $color={colorMap[color]}
        $fontSize={fontSize}
        $fontWeight={resolvedFontWeight}
        as={as}
        className={className}
        style={style}
        {...rest}
        {...tooltipHandlers}
      >
        {children}
      </StyledText>
      {tooltipElement}
    </>
  )
}
