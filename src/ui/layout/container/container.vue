<script setup lang="ts">
import { cn } from "@helpers/cn";
import type { TCommonTypes } from "@ui/types";
import { type VariantProps } from "class-variance-authority";
import { computed } from "vue";
import type { TTag } from "./types";
import { containerVariants } from "./variants";

type TContainerProps = VariantProps<typeof containerVariants>;

type Props = TCommonTypes & {
  tag?: TTag;
  inlinePadding?: TContainerProps["inlinePadding"];
  class?: string;
};

const props = defineProps<Props>();

const computedClass = computed(() =>
  cn(
    containerVariants({
      inlinePadding: props.inlinePadding,
    }),
    props.width,
    props.height,
    props.class,
  ),
);
</script>

<template>
  <component :is="props.tag ? props.tag : 'div'" :class="computedClass">
    <slot />
  </component>
</template>
