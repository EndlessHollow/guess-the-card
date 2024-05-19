<script setup lang="ts">
import Card from 'primevue/card'
import Grid from '@ui/layout/grid'
import type { TCard } from '@/types';

type Props = {
    cards: TCard[]
}

defineProps<Props>()
</script>

<template>
    <Grid columns="3" gap="4" class="md:grid-cols-5">
        <Card v-for="(card) in cards" :key="card.type" :pt="{
            body: { class: 'p-0' },
        }" class="w-full">
            <template #content>
                <img :src="card.face" class="w-full"/>
            </template>
        </Card>
    </Grid>
</template>