import { cva } from "class-variance-authority";

export const containerVariants = cva("relative container mx-auto", {
    variants: {
      inlinePadding: {
        "1": "px-1",
        "2": "px-2",
        "3": "px-3",
        "4": "px-4",
        "5": "px-5",
        "6": "px-6",
        "7": "px-7",
        "8": "px-8",
      },
    },
    defaultVariants: {
      inlinePadding: "4",
    },
  });