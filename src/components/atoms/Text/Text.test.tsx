import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Text } from "./Text"

describe("Text", () => {
  it("renders children inside a paragraph by default", () => {
    render(<Text>Hello</Text>)

    const element = screen.getByText("Hello")

    expect(element.tagName).toBe("P")
  })

  it("renders the tag passed via the as prop", () => {
    render(<Text as="h1">Heading</Text>)

    const element = screen.getByText("Heading")

    expect(element.tagName).toBe("H1")
  })

  it("applies the className passed as a prop", () => {
    render(<Text className="custom">Styled</Text>)

    const element = screen.getByText("Styled")

    expect(element).toHaveClass("custom")
  })

  it("applies inline styles passed via the style prop", () => {
    render(<Text style={{ marginTop: "8px" }}>Inline</Text>)

    const element = screen.getByText("Inline")

    expect(element).toHaveStyle({ marginTop: "8px" })
  })

  it("forwards attributes specific to the tag passed via the as prop", () => {
    const url = "https://example.com"

    render(
      <Text as="a" href={url}>
        Link
      </Text>,
    )

    const element = screen.getByText("Link")

    expect(element.tagName).toBe("A")
    expect(element).toHaveAttribute("href", url)
  })

  it("shows the tooltip on hover and hides it on mouse leave", () => {
    const tooltipText = "Helpful hint"

    render(<Text tooltip={tooltipText}>Hover me</Text>)

    const element = screen.getByText("Hover me")

    expect(screen.queryByText(tooltipText)).not.toBeInTheDocument()

    fireEvent.mouseEnter(element)
    expect(screen.getByText(tooltipText)).toBeInTheDocument()

    fireEvent.mouseLeave(element)
    expect(screen.queryByText(tooltipText)).not.toBeInTheDocument()
  })
})
