import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { spacing } from "@/foundation"

import { Card } from "./Card"

describe("Card", () => {
  it("renders children inside a div", () => {
    render(<Card>Content</Card>)

    const element = screen.getByText("Content")

    expect(element.tagName).toBe("DIV")
  })

  it("applies the className passed as a prop", () => {
    render(<Card className="custom">Content</Card>)

    const element = screen.getByText("Content")

    expect(element).toHaveClass("custom")
  })

  it("applies inline styles passed via the style prop", () => {
    render(<Card style={{ padding: spacing[24] }}>Content</Card>)

    const element = screen.getByText("Content")

    expect(element).toHaveStyle({ padding: spacing[24] })
  })

  it("shows the tooltip on hover and hides it on mouse leave", () => {
    const tooltipText = "Card tooltip"

    render(<Card tooltip={tooltipText}>Content</Card>)

    const element = screen.getByText("Content")

    expect(screen.queryByText(tooltipText)).not.toBeInTheDocument()

    fireEvent.mouseEnter(element)
    expect(screen.getByText(tooltipText)).toBeInTheDocument()

    fireEvent.mouseLeave(element)
    expect(screen.queryByText(tooltipText)).not.toBeInTheDocument()
  })
})
