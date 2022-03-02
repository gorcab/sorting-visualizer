import { createStitches } from "@stitches/react";
import { MIN_ITEM_HEIGHT } from "features/common/lib/constants";

export const { css, styled } = createStitches({
  media: {
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
  },
  utils: {
    navWidth: (value: number) => ({
      width: value,

      "@lg": {
        width: "auto",
      },
    }),
    navOpen: (isOpen: boolean) =>
      isOpen
        ? {
            transform: "translateX(0)",

            "@lg": {
              transform: "none",
            },
          }
        : {
            transform: "translateX(-100%)",

            "@lg": {
              transform: "none",
            },
          },
    selectAlgorithm: (isSelected: boolean) =>
      isSelected ? { color: "$green500" } : { color: "$white" },
    nodeHeight: (value: number) => ({
      height: value + MIN_ITEM_HEIGHT,
    }),
  },
  theme: {
    colors: {
      gray: "#1f2937",
      white: "#ffffff",
      green500: "#22c55e",
      green600: "rgba(22, 163, 74, 1)",
      bg: "$gray",
      disabled: "#6b7280",
      initial: "rgba(22, 163, 74, 0.5)",
      selected: "$green600",
      sorted: "rgba(8, 145, 178, 1)",
    },
    sizes: {
      1: "0.25rem",
      2: "0.5rem",
      3: "0.0.75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      28: "7rem",
      32: "8rem",
      36: "9rem",
      40: "10rem",
      44: "11rem",
      48: "12rem",
      52: "13rem",
      56: "14rem",
      60: "15rem",
      64: "16rem",
      72: "18rem",
      80: "20rem",
      96: "24rem",
      full: "100%",
      h_screen: "100vh",
    },
    space: {
      sm: "0.5rem",
      base: "1rem",
      md: "1.5rem",
      h_screen: "100vh",
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      xl2: "1.5rem",
      xl3: "1.75rem",
      xl4: "2rem",
    },
    borderWidths: {
      2: "2px",
    },
  },
});
