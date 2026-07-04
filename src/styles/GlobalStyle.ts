import { createGlobalStyle } from "styled-components"

import appBackground from "@/assets/images/app-background.png"
import { typography } from "@/foundation"

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-attachment: fixed;
    background-image: url(${appBackground});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    font-family: ${typography.fontFamily.sans};
    min-height: 100vh;
  }
`

export default GlobalStyle
