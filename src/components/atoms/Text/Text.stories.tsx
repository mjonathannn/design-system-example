import type { Meta, StoryObj } from "@storybook/react-vite"

import { Text } from "./Text"

const meta: Meta<typeof Text> = {
  args: {
    children: "The quick brown fox jumps over the lazy dog",
  },
  argTypes: {
    align: {
      control: "select",
      options: ["left", "center", "right", "justify"],
    },
    color: {
      control: "select",
      options: ["default", "secondary", "muted", "inverse", "brand", "success", "warning", "danger", "info"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"],
    },
    weight: {
      control: "select",
      options: ["regular", "medium", "semibold", "bold"],
    },
  },
  component: Text,
  tags: ["autodocs"],
  title: "Atoms/Text",
}

export default meta

type Story = StoryObj<typeof Text>

export const Default: Story = {}

export const Heading: Story = {
  args: {
    as: "h1",
    size: "3xl",
    weight: "bold",
  },
}

export const WithInlineStyle: Story = {
  args: {
    children: "Text with a one-off inline style override",
    style: { textDecoration: "underline", textTransform: "uppercase" },
  },
}

export const AsLink: Story = {
  args: {
    as: "a",
    children: "Text rendered as a link",
    color: "brand",
    href: "https://example.com",
    target: "_blank",
  },
}

export const WithTooltip: Story = {
  args: {
    children: "Hover me to see the tooltip",
    tooltip: "Helpful hint that follows your cursor",
  },
}

export const Colors: Story = {
  render: () => (
    <>
      <Text color="default">default</Text>
      <Text color="brand">brand</Text>
      <Text color="danger">danger</Text>
      <Text color="info">info</Text>
      <Text color="muted">muted</Text>
      <Text color="secondary">secondary</Text>
      <Text color="success">success</Text>
      <Text color="warning">warning</Text>
    </>
  ),
}
