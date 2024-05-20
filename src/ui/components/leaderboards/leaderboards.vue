<script setup lang="ts">
import Flex from "@ui/layout/flex"
import Heading from "@ui/typography/heading"
import Container from "@ui/layout/container"

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button'

import { injectStrict } from "@helpers/inject-strict";
import type { TGame } from "@/types";
import { gameKey } from "@/keys";

const game = injectStrict<TGame>(gameKey)

function fetchLeaderboardData() {
    const leaderboard = [];

    try {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                const score = localStorage.getItem(key) || '0';
                leaderboard.push({ id: key, score });
            }
        }
    } catch (error) {
        console.error("Failed to read from localStorage:", error);
    }
    
    return leaderboard.sort((a, b) => parseInt(b.score) - parseInt(a.score));
}

const sortedTableData = fetchLeaderboardData();
</script>

<template>
    <Container height="h-screen">
    <Flex direction="column" justify="center" align="center" gap="6" height="h-full">
        <Heading>Leaderboards</Heading>
        <DataTable :value="sortedTableData" class="w-full">
            <Column field="id" header="Id"></Column>
            <Column field="score" header="Score"></Column>
        </DataTable>
        <Button @click="game.startGame()" label="Play Again"/>
    </Flex>
    </Container>
</template>