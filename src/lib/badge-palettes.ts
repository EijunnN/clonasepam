export const BADGE_PALETTES = {
  default: {
    name: "Default",
    colors: null, // Use original colors
  },
  pink: {
    name: "Rosa",
    colors: ["#ffdaed", "#ff72ba", "#e673ad", "#bd156b"],
  },
  orange: {
    name: "Naranja",
    colors: ["#ffe3d0", "#fd8e1c", "#d39062", "#a25b12"],
  },
  yellow: {
    name: "Amarillo",
    colors: ["#fdfa7e", "#d5aa17", "#b4b25a", "#8d710f"],
  },
  teal: {
    name: "Verde azulado",
    colors: ["#cde9e2", "#5fb58f", "#50a792", "#23714f"],
  },
  blue: {
    name: "Azul",
    colors: ["#d0ebf3", "#72aaba", "#61a6ba", "#276779"],
  },
  purple: {
    name: "Morado",
    colors: ["#ebdfff", "#b68aff", "#ac87e7", "#7238d3"],
  },
  violet: {
    name: "Violeta",
    colors: ["#f0ddff", "#c188ef", "#ba80e8", "#8235c0"],
  },
  deepPurple: {
    name: "Morado intenso",
    colors: ["#f4d8ec", "#c48bc1", "#d672b8", "#932e8e"],
  },
  red: {
    name: "Rojo",
    colors: ["#ffdcdc", "#e28888", "#e57b7b", "#a93535"],
  },
  brown: {
    name: "Marrón",
    colors: ["#e7dfd6", "#b99772", "#ac8f72", "#854908"],
  },
  olive: {
    name: "Verde oliva",
    colors: ["#e9e9e9", "#a2a370", "#a0a0a0", "#5f601e"],
  },
  customRed: {
    name: "Rojo oscuro",
    colors: ["#ffcccc", "#ff0000", "#cc0000", "#800000"], // Inferred from "Custom Red"
  },
} as const;

export type BadgePaletteName = keyof typeof BADGE_PALETTES;
