import { radius } from "./radius"

export const borderRadiusLevels = {
  full: radius.full,
  high: radius["5xl"],
  low: radius.sm,
  medium: radius.xl,
}

export type BorderRadiusLevelsType = typeof borderRadiusLevels
