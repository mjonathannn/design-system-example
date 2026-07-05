import type { CSSProperties, ReactNode } from "react"

import { useTooltip } from "../Tooltip"
import type { TagColor, TagVariant } from "./Tag.styles"
import { StyledTag, tagColorMap } from "./Tag.styles"

export type TagProps = {
  children: ReactNode
  className?: string
  color?: TagColor
  elevated?: boolean
  endIcon?: ReactNode
  startIcon?: ReactNode
  style?: CSSProperties
  tooltip?: string
  variant?: TagVariant
}

export const Tag = (props: TagProps) => {
  const {
    children,
    className,
    color = "default",
    elevated = true,
    endIcon,
    startIcon,
    style,
    tooltip,
    variant = "solid",
  } = props

  const { tooltipElement, tooltipHandlers } = useTooltip(tooltip)

  const { background, border, color: textColor } = tagColorMap[variant][color]

  return (
    <>
      <StyledTag
        $background={background}
        $border={border}
        $color={textColor}
        $elevated={elevated}
        className={className}
        style={style}
        {...tooltipHandlers}
      >
        {startIcon}
        {children}
        {endIcon}
      </StyledTag>
      {tooltipElement}
    </>
  )
}
