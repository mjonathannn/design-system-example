import { render, screen } from "@testing-library/react"
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
})
