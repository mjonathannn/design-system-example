import type { Meta, StoryObj } from "@storybook/react-vite"

import { spacing } from "@/foundation"

import { Card } from "./Card"

const meta: Meta<typeof Card> = {
  args: { children: "Card content goes here." },
  argTypes: { translucent: { control: "select", options: [false, true, "low", "medium", "high"] } },
  component: Card,
  tags: ["autodocs"],
  title: "Atoms/Card",
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {}

export const Elevated: Story = { args: { elevated: true } }

export const TranslucentLow: Story = {
  args: { translucent: "low" },
  decorators: [
    (Story) => (
      <div style={{ background: "linear-gradient(135deg, #3D5778 0%, #4B87D6 100%)", padding: spacing[32] }}>
        <Story />
      </div>
    ),
  ],
}

export const TranslucentMedium: Story = {
  args: { translucent: "medium" },
  decorators: [
    (Story) => (
      <div style={{ background: "linear-gradient(135deg, #3D5778 0%, #4B87D6 100%)", padding: spacing[32] }}>
        <Story />
      </div>
    ),
  ],
}

export const TranslucentHigh: Story = {
  args: { translucent: "high" },
  decorators: [
    (Story) => (
      <div style={{ background: "linear-gradient(135deg, #3D5778 0%, #4B87D6 100%)", padding: spacing[32] }}>
        <Story />
      </div>
    ),
  ],
}

export const ElevatedAndTranslucent: Story = {
  args: { elevated: true, translucent: "medium" },
  decorators: [
    (Story) => (
      <div style={{ background: "linear-gradient(135deg, #3D5778 0%, #4B87D6 100%)", padding: spacing[32] }}>
        <Story />
      </div>
    ),
  ],
}

export const WithTooltip: Story = { args: { tooltip: "Extra information about this card" } }
