<script setup lang="ts">
import Flex from "@ui/layout/flex"
import Button from "primevue/button"
import Container from "@ui/layout/container"
import type { TOptions } from "@/types";

type Props = {
    options: TOptions[]
}

defineProps<Props>()

</script>

<template>
    <div class="fixed z-10 w-full bottom-0 left-0 py-8 bg-white shadow-[0_-4px_6px_rgba(0,0,0,0.1)] sm:h-16 sm:py-0">
        <Container height="h-full">
            <Flex direction="column" gap="4" height="h-full" class="sm:flex-row sm:justify-center sm:items-center">
                <Button v-for="option in options" @click="option.onClick(option.label)">{{ option.label }}</Button>
            </Flex>
        </Container>
    </div>

</template>