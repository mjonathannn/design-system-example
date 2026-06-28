import type { Preview } from "@storybook/react-vite"

import GlobalStyle from "../src/styles/GlobalStyle"

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <GlobalStyle />
        <Story />
      </>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
