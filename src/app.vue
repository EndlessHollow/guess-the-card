<script setup lang="ts">
import StartingScreen from "@ui/components/starting-screen";
import Leaderboards from "@ui/components/leaderboards";
import Board from "@ui/components/board";

import { computed, onBeforeUnmount, provide, ref } from "vue";

import { v4 as uuidv4 } from "uuid";

import type { TGameState } from "./types";
import { gameKey } from "./keys";

const TOTAL_TIME = 100;

let intervalId: number;
const gameState = ref<TGameState>({
  id: "",
  time: 0,
  score: 0,
  status: "pre-game",
});

const totalTime = ref(0);

const timeLeft = computed({
  get: () => gameState.value.time,
  set: (val: number) => {
    gameState.value.time = val;
  },
});

const currentComponent = computed(() => {
  const status = gameState.value.status;
  if (["in-progress", "idle"].includes(status)) return Board;
  if (status === "completed") return Leaderboards;
  return StartingScreen;
});

function saveResult() {
  if (!gameState.value) return;
  localStorage.setItem(gameState.value.id, gameState.value.score.toString());
}

function endGame() {
  gameState.value.status = "completed";
  saveResult();
  clearInterval(intervalId);
}

function updateGameTime() {
  if (gameState.value.time <= 0) {
    endGame();
    return;
  }
  if (gameState.value.status !== "idle") {
    gameState.value.time--;
  }
}

function startGame() {
  gameState.value = {
    id: uuidv4(),
    time: TOTAL_TIME,
    score: 0,
    status: "in-progress",
  };
  totalTime.value = gameState.value.time;
  intervalId = setInterval(updateGameTime, 1000);
}

onBeforeUnmount(() => clearInterval(intervalId));
provide(gameKey, { gameState, totalTime, timeLeft, startGame });
</script>

<template>
  <main class="relative">
    <component :is="currentComponent" />
  </main>
</template>
