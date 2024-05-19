<script setup lang="ts">
import Flex from '@ui/layout/flex'
import Heading from '@ui/typography/heading'
import Text from '@ui/typography/text'

import type { TAnswer } from '@/types';

type Props = {
    answer: TAnswer | undefined
}

defineProps<Props>()

</script>

<template>
    <Flex direction="column" justify="center" align="center" height="h-screen" gap="4">
        <Heading>{{ answer }}</Heading>
        <Text>{{ answer === 'correct' ? 'You gained 5 seconds' : 'You lost 10 seconds' }}</Text>
    </Flex>
</template>
