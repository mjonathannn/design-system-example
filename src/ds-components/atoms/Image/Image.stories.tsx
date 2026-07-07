import type { Meta, StoryObj } from "@storybook/react-vite"

import schoolFlowIcon from "@/assets/images/school-flow.svg"
import { radius, shadows, spacing } from "@/foundation"

import { Image } from "./Image"

const spacingKeys = Object.keys(spacing).map(Number) as (keyof typeof spacing)[]
const shadowKeys = Object.keys(shadows) as (keyof typeof shadows)[]
const radiusKeys = Object.keys(radius) as (keyof typeof radius)[]

const meta: Meta<typeof Image> = {
  args: {
    alt: "Ícone do SchoolFlow360",
    src: schoolFlowIcon,
  },
  argTypes: {
    borderRadius: {
      control: "select",
      description: "Border radius token applied to the image, from the radius token scale. Defaults to xl.",
      options: radiusKeys,
    },
    boxShadow: {
      control: "select",
      description: "Box shadow token applied to the image, from the shadows token scale. Defaults to xl.",
      options: shadowKeys,
    },
    size: {
      control: "select",
      description: "Size (width and height) applied to the image, from the spacing token scale. Defaults to 48.",
      options: spacingKeys,
    },
    tooltip: {
      control: "text",
      description: "Text shown in a cursor-following tooltip on hover.",
    },
  },
  component: Image,
  tags: ["autodocs"],
  title: "Atoms/Image",
}

export default meta

type Story = StoryObj<typeof Image>

// Default rendering, using the default 48px size, xl box shadow and xl border radius
export const Default: Story = {}

// Every spacing-token-derived size available for the size prop
export const Sizes: Story = {
  render: () => (
    <div style={{ alignItems: "center", display: "flex", gap: spacing[24] }}>
      <Image alt="Ícone do SchoolFlow360" size={32} src={schoolFlowIcon} />
      <Image alt="Ícone do SchoolFlow360" size={48} src={schoolFlowIcon} />
      <Image alt="Ícone do SchoolFlow360" size={64} src={schoolFlowIcon} />
      <Image alt="Ícone do SchoolFlow360" size={96} src={schoolFlowIcon} />
    </div>
  ),
}

// Every shadow token available for the boxShadow prop
export const BoxShadows: Story = {
  render: () => (
    <div style={{ alignItems: "center", display: "flex", gap: spacing[24] }}>
      {shadowKeys.map((shadow) => (
        <Image key={shadow} alt="Ícone do SchoolFlow360" boxShadow={shadow} src={schoolFlowIcon} />
      ))}
    </div>
  ),
}

// Every radius token available for the borderRadius prop
export const BorderRadiuses: Story = {
  render: () => (
    <div style={{ alignItems: "center", display: "flex", gap: spacing[24] }}>
      {radiusKeys.map((radiusKey) => (
        <Image key={radiusKey} alt="Ícone do SchoolFlow360" borderRadius={radiusKey} src={schoolFlowIcon} />
      ))}
    </div>
  ),
}

// The tooltip prop showing a cursor-following tooltip on hover
export const WithTooltip: Story = {
  args: {
    tooltip: "Logotipo oficial",
  },
}
