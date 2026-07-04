import styled, { css } from "styled-components"

import { radius, spacing } from "@/foundation"

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
      border-radius: ${radius.xl};
      border: ${$border};
      overflow: hidden;
      padding: ${spacing[12]};
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
