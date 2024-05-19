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

function getTableValues(data: any) {
    const result = []
    for (const key in data) {

        const id = key;
        const score = data[key];
        const obj = { id, score };

        result.push(obj);
    }
    return result
}

function getLocalStorageData() {
    const result: { [key: string]: string } = {}

    for (let i = 0; i <= localStorage.length; i++) {
        const key: string = localStorage.key(i)!;
        const value: string | null = localStorage.getItem(key);
        if (value !== null) {
            result[key] = value;
        }
    }

    return result
}

const localStorageData = getLocalStorageData()
const tableData = getTableValues(localStorageData)
const sortedTableData = tableData.sort((a,b) => b.score - a.score)

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