<script setup lang="ts">
import { cn } from "@helpers/cn";
import type { TCommonTypes } from "@ui/types";
import { type VariantProps } from "class-variance-authority";
import { computed } from "vue";
import { flexVariants } from "./variants";

type flexProps = VariantProps<typeof flexVariants>;

type Props = TCommonTypes & {
  justify?: flexProps["justify"];
  align?: flexProps["align"];
  gap?: flexProps["gap"];
  display?: flexProps["display"];
  direction?: flexProps["direction"];
  wrap?: flexProps["wrap"];
  class?: string;
};

const props = defineProps<Props>();

const computedClass = computed(() =>
  cn(
    flexVariants({
      display: props.display,
      direction: props.direction,
      justify: props.justify,
      align: props.align,
      wrap: props.wrap,
      gap: props.gap,
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
