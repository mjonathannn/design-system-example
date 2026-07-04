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
    bold: {
      control: "boolean",
      description: "Shorthand for weight=\"bold\". Takes precedence over semibold and weight.",
    },
    color: {
      control: "select",
      options: ["default", "secondary", "muted", "inverse", "brand", "success", "warning", "danger", "info"],
    },
    semibold: {
      control: "boolean",
      description: "Shorthand for weight=\"semibold\". Takes precedence over weight; overridden by bold.",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"],
    },
    weight: {
      control: "select",
      description: "Explicit font weight. Ignored when bold or semibold is set.",
      options: ["regular", "medium", "semibold", "bold"],
    },
  },
  component: Text,
  tags: ["autodocs"],
  title: "Atoms/Text",
}

export default meta

type Story = StoryObj<typeof Text>

// Default rendering with no variant props set
export const Default: Story = {}

// Polymorphic "as" prop rendering Text as an h1, combined with a larger size/weight
export const Heading: Story = {
  args: {
    as: "h1",
    size: "3xl",
    weight: "bold",
  },
}

// The bold convenience prop, a shorthand for weight="bold"
export const Bold: Story = {
  args: {
    bold: true,
    children: "Bold text via the bold prop",
  },
}

// The semibold convenience prop, a shorthand for weight="semibold"
export const Semibold: Story = {
  args: {
    children: "Semibold text via the semibold prop",
    semibold: true,
  },
}

// The style escape hatch applying one-off inline CSS on top of the variant props
export const WithInlineStyle: Story = {
  args: {
    children: "Text with a one-off inline style override",
    style: { textDecoration: "underline", textTransform: "uppercase" },
  },
}

// The polymorphic "as" prop rendering Text as an anchor, forwarding native anchor attributes like href/target
export const AsLink: Story = {
  args: {
    as: "a",
    children: "Text rendered as a link",
    color: "brand",
    href: "https://example.com",
    target: "_blank",
  },
}

// The tooltip prop showing a cursor-following tooltip on hover
export const WithTooltip: Story = {
  args: {
    children: "Hover me to see the tooltip",
    tooltip: "Helpful hint that follows your cursor",
  },
}

// Every semantic color variant rendered side by side
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
