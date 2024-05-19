<script setup lang="ts">
import { cn } from '@/helpers/cn';
import { type VariantProps } from 'class-variance-authority';
import { computed } from 'vue';
import type { TTag } from './types';
import { textVariants } from './variants';

type TTextProps = VariantProps<typeof textVariants>

type Props =
    & {
        tag?: TTag;
        size?: TTextProps['size']
        weight?: TTextProps['weight']
        color?: TTextProps['color']
        align?: TTextProps['align']
        class?: string
    };

const props = defineProps<Props>()

const computedClass = computed(() => cn(
    textVariants({
        size: props.size, weight: props.weight, color: props.color, align: props.align
    }),
    props.class
)
)
</script>

<template>
    <component :is="props.tag ? props.tag : 'p'" :class="computedClass">
        <slot />
    </component>
</template>