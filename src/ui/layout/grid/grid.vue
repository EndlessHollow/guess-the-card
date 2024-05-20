<script setup lang="ts">
import { cn } from "@/helpers/cn";
import type { TCommonTypes } from "@/ui/types";
import type { VariantProps } from "class-variance-authority";
import { computed } from "vue";
import { gridVariants } from "./variants";

type TGridProps = VariantProps<typeof gridVariants>;

type Props = TCommonTypes & {
  display?: TGridProps["display"];
  rows?: TGridProps["rows"];
  columns?: TGridProps["columns"];
  justify?: TGridProps["justify"];
  align?: TGridProps["align"];
  gap?: TGridProps["gap"];
  flow?: TGridProps["flow"];
  class?: string;
};

const props = defineProps<Props>();

const computedClass = computed(() =>
  cn(
    gridVariants({
      display: props.display,
      rows: props.rows,
      columns: props.columns,
      justify: props.justify,
      align: props.align,
      gap: props.gap,
      flow: props.flow,
    }),
    props.width,
    props.height,
    props.class,
  ),
);
</script>

<template>
  <div :class="computedClass">
    <slot />
  </div>
</template>
