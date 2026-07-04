import type { Meta, StoryObj } from "@storybook/react-vite"

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
    <>
      <Tag color="default">default</Tag>
      <Tag color="secondary">secondary</Tag>
      <Tag color="muted">muted</Tag>
      <Tag color="inverse">inverse</Tag>
      <Tag color="brand">brand</Tag>
      <Tag color="success">success</Tag>
      <Tag color="warning">warning</Tag>
      <Tag color="danger">danger</Tag>
      <Tag color="info">info</Tag>
    </>
  ),
}
