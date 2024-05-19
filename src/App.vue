<script setup lang="ts">
import StartingScreen from "@ui/components/starting-screen";
import Leaderboards from "@ui/components/leaderboards";
import Board from "@ui/components/board";

import { computed, onBeforeUnmount, provide, ref } from "vue";

import { v4 as uuidv4 } from 'uuid';

import type { TGameState } from "./types";
import { gameKey } from "./keys";

let intervalId: number;

const gameState = ref<TGameState>()

const totalTime = computed(() => gameState.value ? gameState.value.time : 0);
const timeLeft = computed({
  get: () => gameState.value ? gameState.value.time : 0,
  set: (val: number) => {
    if(gameState.value) {
      gameState.value.time = val;
    }
  }
});

function startGame() {
  gameState.value = {
    id: uuidv4(),
    time: 100,
    score: 0,
    status: "pre-game",
  }
  
  intervalId = setInterval(() => {
    if(!gameState.value) {
      return
    }

    if (gameState.value.time > 0 && gameState.value.status !== "idle") {
      gameState.value.time--;
    }

    if (gameState.value.time <= 0) {
      gameState.value.status = "completed"
      saveResult()
      clearInterval(intervalId);
    }
  }, 1000);
  gameState.value.status = "in-progress";
}

function saveResult() {
  if(!gameState.value) return 
  const gameId = gameState.value.id
  const score = gameState.value.score.toString()
  localStorage.setItem(gameId, score)
}

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

provide(gameKey, {
  gameState,
  totalTime,
  timeLeft,
  startGame
})

console.log('render')

</script>

<template>
  <main class="relative">
    <StartingScreen v-if="gameState?.status !== 'in-progress' && gameState?.status !== 'idle' && gameState?.status !== 'completed'"/>
    <Board v-if="gameState?.status === 'in-progress' || gameState?.status === 'idle'" />
    <Leaderboards v-if="gameState?.status === 'completed'" />
  </main>

</template>
