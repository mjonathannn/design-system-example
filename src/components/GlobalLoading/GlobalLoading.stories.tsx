import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

import { startLoading, stopLoading } from "@/utils/loadingStore"

import { GlobalLoading } from "./GlobalLoading"

const meta: Meta<typeof GlobalLoading> = {
  component: GlobalLoading,
  tags: ["autodocs"],
  title: "Components/GlobalLoading",
}

export default meta

type Story = StoryObj<typeof GlobalLoading>

// Toggled manually here since GlobalLoading takes no props - in the real app it's driven
// automatically by httpClient's request/response interceptors instead of a button click
export const Default: Story = {
  render: () => {
    const [loading, setLoading] = useState(false)

    const toggle = () => {
      if (loading) stopLoading()
      else startLoading()

      setLoading(!loading)
    }

    return (
      <>
        <button onClick={toggle} type="button">
          {loading ? "Parar chamada simulada" : "Simular chamada de API"}
        </button>
        <GlobalLoading />
      </>
    )
  },
}
