<script setup lang="ts">
import Heading from '@ui/typography/heading/heading.vue';
import Flex from '@ui/layout/flex'
import Container from '@ui/layout/container';

import Button from 'primevue/button';

import { injectStrict } from '@helpers/inject-strict';

import { gameKey } from '@/keys';
import type { TGame } from '@/types';


const game = injectStrict<TGame>(gameKey)
</script>

<template>
        <Container height="h-screen">
            <Flex direction="column" gap="6" justify="center" align="center" height="h-full">
                <Heading>Guess The Cards</Heading>
                <Button @click="game.startGame()" label="Start" />
            </Flex>
        </Container>
</template>
