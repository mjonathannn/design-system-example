import { createBrowserRouter } from "react-router-dom"

import { Experimental, Home } from "@/pages"

export const router = createBrowserRouter([
  { element: <Home />, path: "/" },
  { element: <Experimental />, path: "/experimental" },
])
