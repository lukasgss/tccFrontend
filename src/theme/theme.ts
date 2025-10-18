import { DefaultMantineColor, MantineColorsTuple, MantineThemeOverride, rem } from "@mantine/core";

type ExtendedCustomColors = "brand-blue" | "brand-purple" | "brand-light-blue" | DefaultMantineColor;

const brandBlue: MantineColorsTuple = [
  "#ebeaff",
  "#d2d0ff",
  "#a09cff",
  "#4036fe",
  "#2519fe",
  "#1509ff",
  "#635BFF",
  "#4f47de",
  "#0000cc",
  "#0000b4",
];

const brandPurple: MantineColorsTuple = [
  "#f9e9ff",
  "#ebcfff",
  "#d29cff",
  "#B55BFF",
  "#a437fe",
  "#971afe",
  "#b55bff",
  "#a84df3",
  "#6f00cc",
  "#5f00b3",
];

const brandLightBlue: MantineColorsTuple = [
  "#dfffff",
  "#caf8ff",
  "#9aeeff",
  "#64e5ff",
  "#3dddfe",
  "#09d6ff",
  "#00D4FF",
  "#00bde4",
  "#00a8cc",
  "#0092b3",
];

const brandOrange: MantineColorsTuple = [
  "#fff0e3",
  "#ffe1cd",
  "#fbc19f",
  "#f7a06d",
  "#f38341",
  "#f17025",
  "#f26616",
  "#d75608",
  "#c04b04",
  "#a83e00",
];

const theme: MantineThemeOverride = {
  colors: {
    "brand-blue": brandBlue,
    "brand-purple": brandPurple,
    "brand-light-blue": brandLightBlue,
    "brand-orange": brandOrange,
  },
  primaryColor: "brand-blue",
  headings: {
    sizes: {
      h1: { fontSize: rem(42) },
      h2: { fontSize: rem(32) },
      h3: { fontSize: rem(28) },
      h4: { fontSize: rem(24) },
      h5: { fontSize: rem(18) },
      h6: { fontSize: rem(16) },
    },
  },
  fontFamily: "Onest Regular, sans-serif",
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
  },
  components: {
    Title: {
      styles: {
        root: {
          color: "#4d4751",
        },
      },
    },
    Text: {
      styles: {
        root: {
          color: "#4d4751",
        },
      },
    },
  },
};

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}

export default theme;
