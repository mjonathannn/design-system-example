import schoolFlowIcon from "@/assets/images/school-flow-icon.svg"
import { Card, Grid, Icon, Image, Tag, Text } from "@/ds-components/atoms"

import { colors, radius, spacing } from "../../foundation"
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
              style={{
                borderRadius: radius["5xl"],
                display: "flex",
                flexDirection: "column",
                gap: spacing[20],
                padding: spacing[40],
              }}
            >
              <div style={{ alignItems: "center", display: "flex", gap: spacing[12] }}>
                <Image alt="Ícone do SchoolFlow360" src={schoolFlowIcon} size={64} borderRadius="2xl" />

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text as="p" color="inverse" fontSize="lg" bold>
                    SchoolFlow360º
                  </Text>

                  <Text as="p" color="muted" fontSize="sm">
                    Powered by JLM Core
                  </Text>
                </div>
              </div>

              <Tag
                color="success"
                fontSize="xs"
                fontWeight="bold"
                variant="soft"
                style={{ textTransform: "uppercase" }}
              >
                SaaS white label multi-tenant
              </Tag>

              <Text as="p" color="inverse" fontSize="7xl" bold>
                Gestão escolar que parece simples, mas opera em 360º.
              </Text>

              <Text as="p" color="muted">
                Uma experiência executiva para diretores, escola, professores e famílias: cada perfil entra em uma
                jornada visual própria, com navegação adaptativa, indicadores claros e interações acolhedoras.
              </Text>

              <div style={{ display: "flex", flexWrap: "wrap", gap: spacing[8] }}>
                <Tag
                  color="muted"
                  variant="soft"
                  translucent="high"
                  textColor={colors.neutral[0]}
                  padding="md"
                  startIcon={<Icon color="inverse" name="dashboard-outline" size={16} />}
                >
                  Dashboard 360º
                </Tag>

                <Tag
                  color="muted"
                  variant="soft"
                  translucent="high"
                  textColor={colors.neutral[0]}
                  padding="md"
                  startIcon={<Icon color="inverse" name="label-outline" size={16} />}
                >
                  White Label
                </Tag>

                <Tag
                  color="muted"
                  variant="soft"
                  translucent="high"
                  textColor={colors.neutral[0]}
                  padding="md"
                  startIcon={<Icon color="inverse" name="users-outline" size={16} />}
                >
                  Alunos
                </Tag>

                <Tag
                  color="muted"
                  variant="soft"
                  translucent="high"
                  textColor={colors.neutral[0]}
                  padding="md"
                  startIcon={<Icon color="inverse" name="money-outline" size={16} />}
                >
                  Financeiro
                </Tag>

                <Tag
                  color="muted"
                  variant="soft"
                  translucent="high"
                  textColor={colors.neutral[0]}
                  padding="md"
                  startIcon={<Icon color="inverse" name="star-outline" size={16} />}
                >
                  IA
                </Tag>
              </div>
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
