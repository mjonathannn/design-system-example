import type { Meta, StoryObj } from "@storybook/react-vite"

import { spacing } from "@/foundation"

import { Card } from "./Card"

const meta: Meta<typeof Card> = {
  args: { children: "O conteúdo do card fica aqui." },
  argTypes: { translucent: { control: "select", options: [false, true, "low", "medium", "high"] } },
  component: Card,
  tags: ["autodocs"],
  title: "Atoms/Card",
}

export default meta

type Story = StoryObj<typeof Card>

// Default rendering with no variant props set
export const Default: Story = {}

// The elevated prop adding a drop shadow and removing the border
export const Elevated: Story = { args: { elevated: true } }

// The translucent prop at its lowest opacity level, over a colored background to show the glass effect
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

// The translucent prop at its medium (default true) opacity level, over a colored background to show the glass effect
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

// The translucent prop at its highest opacity level, over a colored background to show the glass effect
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

// elevated and translucent combined together on the same Card
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

// The tooltip prop showing a cursor-following tooltip on hover
export const WithTooltip: Story = { args: { tooltip: "Informação extra sobre este card" } }
