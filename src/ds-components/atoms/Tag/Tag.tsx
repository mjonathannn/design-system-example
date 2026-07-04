import type { CSSProperties, ReactNode } from "react"

import { useTooltip } from "../Tooltip"
import type { TagColor } from "./Tag.styles"
import { StyledTag, tagColorMap } from "./Tag.styles"

export type TagProps = {
  children: ReactNode
  className?: string
  color?: TagColor
  endIcon?: ReactNode
  startIcon?: ReactNode
  style?: CSSProperties
  tooltip?: string
}

export const Tag = (props: TagProps) => {
  const { children, className, color = "default", endIcon, startIcon, style, tooltip } = props

  const { tooltipElement, tooltipHandlers } = useTooltip(tooltip)

  const { background, border, color: textColor } = tagColorMap[color]

  return (
    <>
      <StyledTag
        $background={background}
        $border={border}
        $color={textColor}
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
