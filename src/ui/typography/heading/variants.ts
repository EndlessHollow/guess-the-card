import { cva } from "class-variance-authority";
import { fontWeightTokens, textAlignmentTokens } from "../tokens";

export const headingVariants = cva("text-gray-800", {
  variants: {
    type: {
      h1: "text-4xl font-bold",
      h2: "text-3xl font-bold",
      h3: "text-2xl font-medium",
      h4: "text-lg font-semibold",
    },
    size: {
      "4xl": "text-4xl",
      "3xl": "text-3xl",
      "2xl": "text-2xl",
      lg: "text-lg",
    },
    weight: fontWeightTokens,
    align: textAlignmentTokens,
  },
  defaultVariants: {
    type: "h1",
  },
});
