import type { Meta, StoryObj } from "@storybook/react-vite"

import { Tooltip } from "./Tooltip"

const meta: Meta<typeof Tooltip> = {
  args: {
    children: "Helpful hint",
    x: 0,
    y: 0,
  },
  component: Tooltip,
  tags: ["autodocs"],
  title: "Atoms/Tooltip",
}

export default meta

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {}
