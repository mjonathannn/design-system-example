import type { Meta, StoryObj } from "@storybook/react-vite"

import { spacing, typography } from "@/foundation"

import { Icon } from "./Icon"
import type { IconName } from "./iconMap"
import { iconMap } from "./iconMap"

const allIconNames = Object.keys(iconMap) as IconName[]
const spacingKeys = Object.keys(spacing).map(Number) as (keyof typeof spacing)[]

const meta: Meta<typeof Icon> = {
  args: { name: "home" },
  argTypes: {
    color: {
      control: "select",
      options: ["brand", "danger", "default", "info", "inverse", "muted", "secondary", "success", "warning"],
    },
    name: { control: "select", options: allIconNames },
    size: { control: "select", options: spacingKeys },
  },
  component: Icon,
  tags: ["autodocs"],
  title: "Atoms/Icon",
}

export default meta

type Story = StoryObj<typeof Icon>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <div style={{ alignItems: "center", display: "flex", gap: spacing[16] }}>
      <Icon name="home" size={12} />
      <Icon name="home" size={16} />
      <Icon name="home" size={20} />
      <Icon name="home" size={24} />
      <Icon name="home" size={32} />
      <Icon name="home" size={40} />
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: spacing[16] }}>
      <Icon color="brand" name="bell" />
      <Icon color="danger" name="bell" />
      <Icon color="default" name="bell" />
      <Icon color="info" name="bell" />
      <Icon color="muted" name="bell" />
      <Icon color="secondary" name="bell" />
      <Icon color="success" name="bell" />
      <Icon color="warning" name="bell" />
    </div>
  ),
}

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: spacing[24] }}>
      {allIconNames.map((name) => (
        <div key={name} style={{ alignItems: "center", display: "flex", flexDirection: "column", gap: spacing[8] }}>
          <Icon name={name} size={24} />
          <span style={{ fontSize: `${typography.fontSize.sm}px` }}>{name}</span>
        </div>
      ))}
    </div>
  ),
}

export const WithTooltip: Story = { args: { name: "info", tooltip: "More information" } }
