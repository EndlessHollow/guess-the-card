<script setup lang="ts">
import { cn } from '@/helpers/cn';
import { type VariantProps } from 'class-variance-authority';
import { computed } from 'vue';
import type { TTag } from './types';
import { headingVariants } from './variants';

type THeadingProps = VariantProps<typeof headingVariants>

type Props =
    & {
        tag?: TTag;
        type?: THeadingProps['type']
        size?: THeadingProps['size']
        weight?: THeadingProps['weight']
        align?: THeadingProps['align']
        class?: string
    };

const props = defineProps<Props>()

const computedClass = computed(() => cn(
    headingVariants({
        size: props.size, weight: props.weight, align: props.align, type: props.type
    }),
    props.class
)
)
</script>

<template>
    <component :is="props.tag ? props.tag : 'h1'" :class="computedClass">
        <slot />
    </component>
</template>