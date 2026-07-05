import type { Meta, StoryObj } from "@storybook/react-vite"

import { spacing } from "../../../foundation"
import { Icon } from "../Icon"
import { Tag } from "./Tag"

const meta: Meta<typeof Tag> = {
  args: {
    children: "Novo",
  },
  argTypes: {
    color: {
      control: "select",
      options: ["default", "secondary", "muted", "inverse", "brand", "success", "warning", "danger", "info"],
    },
    elevated: {
      control: "boolean",
      description: "Adds a drop shadow around the tag. Defaults to true.",
    },
    endIcon: {
      control: false,
      description: "Icon element rendered after the tag's label.",
    },
    startIcon: {
      control: false,
      description: "Icon element rendered before the tag's label.",
    },
    tooltip: {
      control: "text",
      description: "Text shown in a cursor-following tooltip on hover.",
    },
    variant: {
      control: "select",
      options: ["solid", "outlined", "soft"],
    },
  },
  component: Tag,
  tags: ["autodocs"],
  title: "Atoms/Tag",
}

export default meta

type Story = StoryObj<typeof Tag>

// Default rendering, using the default color
export const Default: Story = {}

// The tooltip prop showing a cursor-following tooltip on hover
export const WithTooltip: Story = {
  args: {
    tooltip: "Informação extra sobre esta tag",
  },
}

// The elevated prop set to false, removing the default drop shadow around the tag
export const Flat: Story = {
  args: {
    elevated: false,
  },
}

// The startIcon prop rendering an icon before the tag's label
export const WithStartIcon: Story = {
  args: {
    children: "Verificado",
    startIcon: <Icon color="inverse" name="check" size={16} />,
  },
}

// The endIcon prop rendering an icon after the tag's label
export const WithEndIcon: Story = {
  args: {
    children: "Ver mais",
    endIcon: <Icon color="inverse" name="chevron-right" size={16} />,
  },
}

// Every semantic color variant rendered side by side
export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: spacing[8] }}>
      <Tag color="brand">brand</Tag>
      <Tag color="danger">danger</Tag>
      <Tag color="default">default</Tag>
      <Tag color="info">info</Tag>
      <Tag color="inverse">inverse</Tag>
      <Tag color="muted">muted</Tag>
      <Tag color="secondary">secondary</Tag>
      <Tag color="success">success</Tag>
      <Tag color="warning">warning</Tag>
    </div>
  ),
}

// The outlined variant, a transparent background with a colored border and text, for every color
export const Outlined: Story = {
  render: () => (
    <div style={{ display: "flex", gap: spacing[8] }}>
      <Tag color="brand" variant="outlined">
        brand
      </Tag>
      <Tag color="danger" variant="outlined">
        danger
      </Tag>
      <Tag color="default" variant="outlined">
        default
      </Tag>
      <Tag color="info" variant="outlined">
        info
      </Tag>
      <Tag color="inverse" variant="outlined">
        inverse
      </Tag>
      <Tag color="muted" variant="outlined">
        muted
      </Tag>
      <Tag color="secondary" variant="outlined">
        secondary
      </Tag>
      <Tag color="success" variant="outlined">
        success
      </Tag>
      <Tag color="warning" variant="outlined">
        warning
      </Tag>
    </div>
  ),
}

// The soft variant, a light tint background with a matching-color border and darker text, for every color
export const Soft: Story = {
  render: () => (
    <div style={{ display: "flex", gap: spacing[8] }}>
      <Tag color="brand" variant="soft">
        brand
      </Tag>
      <Tag color="danger" variant="soft">
        danger
      </Tag>
      <Tag color="default" variant="soft">
        default
      </Tag>
      <Tag color="info" variant="soft">
        info
      </Tag>
      <Tag color="inverse" variant="soft">
        inverse
      </Tag>
      <Tag color="muted" variant="soft">
        muted
      </Tag>
      <Tag color="secondary" variant="soft">
        secondary
      </Tag>
      <Tag color="success" variant="soft">
        success
      </Tag>
      <Tag color="warning" variant="soft">
        warning
      </Tag>
    </div>
  ),
}
