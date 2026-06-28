import styled, { css } from "styled-components"

import { typography } from "../../../foundation"

export type TextSize = keyof typeof typography.fontSize
export type TextWeight = keyof typeof typography.fontWeight
export type TextAlign = "left" | "center" | "right" | "justify"

export type StyledTextProps = {
  $color: string
  $size: TextSize
  $weight: TextWeight
  $align?: TextAlign
}

export const StyledText = styled.p<StyledTextProps>`
  ${(props) => {
    const { $align, $color, $size, $weight } = props

    return css`
      margin: 0;
      color: ${$color};
      font-size: ${typography.fontSize[$size]}px;
      font-weight: ${typography.fontWeight[$weight]};
      line-height: ${typography.lineHeight[$size]};
      ${$align &&
      css`
        text-align: ${$align};
      `}
    `
  }}
`
