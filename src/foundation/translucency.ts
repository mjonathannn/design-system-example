export const translucency = {
  low: {
    backdropFilter: "blur(4px)",
    background: "rgba(255, 255, 255, 0.8)",
  },
  medium: {
    backdropFilter: "blur(10px)",
    background: "rgba(255, 255, 255, 0.55)",
  },
  high: {
    backdropFilter: "blur(20px)",
    background: "rgba(255, 255, 255, 0.2)",
  },
}

export type TranslucencyType = typeof translucency
