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
          <Grid.Col xs={12} md={6}>
            <Card
              translucent="high"
              elevated
              style={{ display: "flex", flexDirection: "column", gap: spacing[16], padding: spacing[40] }}
            >
              <Tag
                color="success"
                fontSize="xs"
                fontWeight="bold"
                variant="soft"
                style={{ alignSelf: "flex-start", textTransform: "uppercase" }}
              >
                SaaS white label multi-tenant
              </Tag>

              <Text as="p" color="inverse" fontSize="7xl" bold>
                Gestão escolar que parece simples, mas opera em 360º.
              </Text>

              <Text as="p" color="inverse">
                Uma experiência executiva para diretores, escola, professores e famílias: cada perfil entra em uma
                jornada visual própria, com navegação adaptativa, indicadores claros e interações acolhedoras.
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col xs={12} md={6}>
            <Card elevated>
              <Text as="p">{loremIpsum}</Text>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </LoginWrapper>
  )
}
