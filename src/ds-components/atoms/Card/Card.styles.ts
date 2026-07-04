import styled, { css } from "styled-components"

import { radius } from "@/foundation"

export type StyledCardProps = {
  $background: string
  $border: string
  $backdropFilter?: string
  $boxShadow?: string
}

export const StyledCard = styled.div<StyledCardProps>`
  ${(props) => {
    const { $backdropFilter, $background, $border, $boxShadow } = props

    return css`
      background: ${$background};
      border-radius: ${radius.md};
      border: ${$border};
      overflow: hidden;
      ${$backdropFilter &&
      css`
        backdrop-filter: ${$backdropFilter};
      `}
      ${$boxShadow &&
      css`
        box-shadow: ${$boxShadow};
      `}
    `
  }}
`
