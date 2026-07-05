import type { Meta, StoryObj } from "@storybook/react-vite"
import { Link, MemoryRouter } from "react-router-dom"

import { spacing } from "../../../foundation"
import { Icon } from "../Icon"
import { Button } from "./Button"

const meta: Meta<typeof Button> = {
  args: {
    children: "Enviar",
  },
  argTypes: {
    as: {
      control: false,
      description: "Element or component the button renders as, e.g. a router Link. Defaults to a native button.",
    },
    disabled: {
      control: "boolean",
      description: "Native disabled attribute, dimming the button and blocking pointer interaction.",
    },
    endIcon: {
      control: false,
      description: "Icon element rendered after the button's label.",
    },
    size: {
      control: "select",
      description: "Size of the button.",
      options: ["small", "medium", "large"],
    },
    startIcon: {
      control: false,
      description: "Icon element rendered before the button's label.",
    },
    tooltip: {
      control: "text",
      description: "Text shown in a cursor-following tooltip on hover.",
    },
    variant: {
      control: "select",
      description: "Visual style of the button.",
      options: ["filled", "outlined", "link"],
    },
  },
  component: Button,
  tags: ["autodocs"],
  title: "Atoms/Button",
}

export default meta

type Story = StoryObj<typeof Button>

// Default rendering, using the filled variant
export const Default: Story = {}

// The outlined variant, a lower-emphasis alternative to filled
export const Outlined: Story = {
  args: {
    children: "Cancelar",
    variant: "outlined",
  },
}

// The link variant, styled as text with no background or border
export const LinkVariant: Story = {
  args: {
    children: "Saiba mais",
    variant: "link",
  },
}

// The small size, a more compact alternative to the default medium
export const Small: Story = {
  args: {
    size: "small",
  },
}

// The large size, a bigger alternative to the default medium
export const Large: Story = {
  args: {
    size: "large",
  },
}

// The startIcon prop rendering an icon before the button's label
export const WithStartIcon: Story = {
  args: {
    children: "Salvar",
    startIcon: <Icon color="inverse" name="check" />,
  },
}

// The endIcon prop rendering an icon after the button's label
export const WithEndIcon: Story = {
  args: {
    children: "Avançar",
    endIcon: <Icon color="inverse" name="chevron-right" />,
  },
}

// The polymorphic as prop rendering the link variant as a native anchor, forwarding href
export const AsAnchor: Story = {
  args: {
    as: "a",
    children: "Ir para o site",
    href: "https://example.com",
    target: "_blank",
    variant: "link",
  },
}

// The polymorphic as prop rendering the link variant as a react-router Link instead of a button
export const AsRouterLink: Story = {
  args: {
    as: Link,
    children: "Ir para o início",
    to: "/",
    variant: "link",
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
}

// The native disabled attribute, dimming the button and blocking pointer interaction
export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

// The tooltip prop showing a cursor-following tooltip on hover
export const WithTooltip: Story = {
  args: {
    children: "Passe o mouse aqui",
    tooltip: "Dica útil que segue o cursor",
  },
}

// All three variants rendered side by side
export const Variants: Story = {
  render: () => (
    <div style={{ alignItems: "center", display: "flex", gap: spacing[8] }}>
      <Button variant="filled">Filled</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

// All three sizes rendered side by side
export const Sizes: Story = {
  render: () => (
    <div style={{ alignItems: "center", display: "flex", gap: spacing[8] }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
}
