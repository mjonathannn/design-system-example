import type { CSSProperties, ReactNode } from "react"

import { colors, shadows, translucency } from "@/foundation"

import { useTooltip } from "../Tooltip"
import { StyledCard } from "./Card.styles"

type TranslucentLevel = "low" | "medium" | "high"

export type CardProps = {
  children?: ReactNode
  className?: string
  elevated?: boolean
  style?: CSSProperties
  tooltip?: string
  translucent?: TranslucentLevel | boolean
}

const resolveTranslucentLevel = (value: TranslucentLevel | true): TranslucentLevel =>
  value === true ? "medium" : value

export const Card = (props: CardProps) => {
  const { children, className, elevated, style, tooltip, translucent } = props

  const { tooltipElement, tooltipHandlers } = useTooltip(tooltip)

  const translucentConfig = translucent
    ? translucency[resolveTranslucentLevel(translucent as TranslucentLevel | true)]
    : null
  const background = translucentConfig?.background ?? colors.neutral[0]
  const backdropFilter = translucentConfig?.backdropFilter
  const boxShadow = elevated ? shadows.lg : undefined
  let border = `1px solid ${colors.neutral[100]}`
  if (elevated) border = "none"
  else if (translucentConfig) border = "1px solid rgba(255, 255, 255, 0.3)"

  return (
    <>
      <StyledCard
        $backdropFilter={backdropFilter}
        $background={background}
        $border={border}
        $boxShadow={boxShadow}
        className={className}
        style={style}
        {...tooltipHandlers}
      >
        {children}
      </StyledCard>
      {tooltipElement}
    </>
  )
}
