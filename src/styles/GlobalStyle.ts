import { createGlobalStyle } from "styled-components"

import { typography } from "@/foundation"

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${typography.fontFamily.sans};
  }
`

export default GlobalStyle
