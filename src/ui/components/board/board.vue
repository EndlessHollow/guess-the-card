<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

import InformationBanner from "@ui/components/information-banner";
import ControlPanel from "@ui/components/control-panel";
import AnswerResult from "@ui/components/answer-result";
import Container from "@ui/layout/container";
import CommunityCards from "@/ui/components/community-cards";
import Flex from "@ui/layout/flex";

import { cards, hands } from "./static";

import { getRandomElements } from "@helpers/get-random-elements";
import { shuffleElements } from "@helpers/shuffle-elements";
import { injectStrict } from "@helpers/inject-strict";

//@ts-ignore
import { Hand } from "pokersolver";

import { gameKey } from "@/keys";
import type { TAnswer, TCard, TGame } from "@/types";
import type { TPokerResult } from "./types";

const CORRECT_ANSWER_VALUE = 5;
const INCORRECT_ANSWER_VALUE = -10;

const game = injectStrict<TGame>(gameKey);
let overlayTimerId: number;

const randomCards = ref<TCard[]>([]);
const answerState = ref<TAnswer>();

const cardTypes = computed(() => randomCards.value.map((card) => card.type));
const pokerResult = computed(() => {
  if (!cardTypes.value.length) return;
  const result: TPokerResult = Hand.solve(cardTypes.value);
  return result;
});
const options = computed(() => {
  if (!pokerResult.value) {
    return [];
  }
  const handName = pokerResult.value.name;
  const randomAnswers = getRandomElements(hands, 2, pokerResult.value.name);
  const shuffledAnswers = shuffleElements(randomAnswers);
  return shuffledAnswers.map((answer) => ({
    item: answer,
    label: answer,
    onClick: () => handleAnswer(answer, handName),
  }));
});

function handleAnswer(selectedAnswer: string, correctAnswer: string) {
  const isCorrect = selectedAnswer === correctAnswer;
  adjustTime(isCorrect);
  updateScore(isCorrect);
  transitionGameState();
}

function adjustTime(isCorrect: boolean) {
  const timeAdjustment = isCorrect
    ? CORRECT_ANSWER_VALUE
    : INCORRECT_ANSWER_VALUE;
  game.timeLeft.value = Math.min(
    100,
    Math.max(0, game.timeLeft.value + timeAdjustment),
  );
}

function updateScore(isCorrect: boolean) {
  if (isCorrect) {
    game.gameState.value.score++;
    answerState.value = "correct";
  } else {
    answerState.value = "incorrect";
  }
}
function transitionGameState() {
  game.gameState.value.status = "idle";
  overlayTimerId = setTimeout(() => {
    game.gameState.value.status = "in-progress";
    answerState.value = undefined;
    randomCards.value = getRandomElements(cards, 5);
  }, 2000);
}

onMounted(() => (randomCards.value = getRandomElements(cards, 5)));
onBeforeUnmount(() => clearTimeout(overlayTimerId));
</script>

<template>
  <AnswerResult
    v-if="game.gameState.value?.status === 'idle'"
    :answer="answerState"
  />
  <template v-else>
    <InformationBanner />
    <Container
      height="h-[calc(100vh-295px)]"
      class="mt-16 pt-8 sm:h-[calc(100vh-152px)]"
    >
      <Flex justify="center" align="center" height="h-full">
        <CommunityCards :cards="randomCards" />
      </Flex>
    </Container>
    <ControlPanel :options="options" />
  </template>
</template>
