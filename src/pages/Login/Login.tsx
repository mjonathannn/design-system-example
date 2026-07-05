import { Card, Grid, Tag, Text } from "@/ds-components/atoms"

import { spacing } from "../../foundation"
import { LoginWrapper } from "./Login.styles"

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

export const Login = () => {
  return (
    <LoginWrapper>
      <Grid.Container>
        <Grid.Row align="center" justify="center">
          <Grid.Col md={6} xs={12}>
            <Card translucent="high" elevated style={{ padding: spacing[40] }}>
              <Tag color="success">success</Tag>

              <Text as="p" color="inverse" size="7xl" bold>
                Gestão escolar que parece simples, mas opera em 360º.
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col md={6} xs={12}>
            <Card elevated>
              <Text as="p">{loremIpsum}</Text>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </LoginWrapper>
  )
}
