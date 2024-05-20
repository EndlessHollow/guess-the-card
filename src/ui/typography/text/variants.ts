import { cva } from "class-variance-authority";
import { fontWeightTokens, textAlignmentTokens } from "../tokens";

export const textVariants = cva(null, {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
    },
    weight: fontWeightTokens,
    color: {
      primary: "text-gray-800",
      secondary: "text-slate-600",
    },
    align: textAlignmentTokens,
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    color: "primary",
    align: "left",
  },
});
