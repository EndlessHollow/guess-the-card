import { cva } from "class-variance-authority";
import { alignTokens, gapTokens, justifyTokens } from "../tokens";

export const flexVariants = cva(null, {
  variants: {
    display: {
      flex: "flex",
      "inline-flex": "inline-flex",
    },
    direction: {
      row: "flex-row",
      column: "flex-col",
      "row-reverse": "flex-row-reverse",
      "column-reverse": "flex-col-reverse",
    },
    wrap: {
      "no-wrap": "flex-nowrap",
      wrap: "flex-wrap",
      "wrap-reverse": "flex-wrap-reverse",
    },
    justify: justifyTokens,
    align: alignTokens,
    gap: gapTokens,
  },
  defaultVariants: {
    display: "flex",
  },
});
