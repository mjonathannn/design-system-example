import type { CSSProperties } from "react"

import { radius, shadows, spacing } from "@/foundation"

import { useTooltip } from "../Tooltip"
import { StyledImage } from "./Image.styles"

export type ImageProps = {
  alt: string
  src: string
  borderRadius?: keyof typeof radius
  boxShadow?: keyof typeof shadows
  className?: string
  size?: keyof typeof spacing
  style?: CSSProperties
  tooltip?: string
}

export const Image = (props: ImageProps) => {
  const { alt, borderRadius = "xl", boxShadow = "xl", className, size = 48, src, style, tooltip } = props

  const { tooltipElement, tooltipHandlers } = useTooltip(tooltip)

  return (
    <>
      <StyledImage
        $borderRadius={radius[borderRadius]}
        $boxShadow={shadows[boxShadow]}
        $size={spacing[size]}
        alt={alt}
        className={className}
        src={src}
        style={style}
        {...tooltipHandlers}
      />
      {tooltipElement}
    </>
  )
}
