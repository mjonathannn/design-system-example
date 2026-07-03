import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ToastContainer } from "react-toastify"

import App from "./App.tsx"
import GlobalStyle from "./styles/GlobalStyle"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyle />
    <App />
    <ToastContainer />
  </StrictMode>,
)
