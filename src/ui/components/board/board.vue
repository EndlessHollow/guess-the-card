<script setup lang="ts">
import InformationBanner from '@ui/components/information-banner';
import ControlPanel from '@ui/components/control-panel';
import AnswerResult from '@ui/components/answer-result'
import Container from "@ui/layout/container";
import CommunityCards from '@/ui/components/community-cards'
import Flex from '@ui/layout/flex'

import { cards, hands } from './static'

import { getRandomElements } from '@helpers/get-random-elements';
import { shuffleElements } from '@helpers/shuffle-elements';

//@ts-ignore
import { Hand } from 'pokersolver'

import { gameKey } from '@/keys';
import type { TAnswer, TCard, TGame, TOptions } from '@/types';
import { injectStrict } from '@helpers/inject-strict';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const game = injectStrict<TGame>(gameKey)

let overlayTimerId: number;

const options = ref<TOptions[]>([]);
const randomCards = ref<TCard[]>([]);
const answerState = ref<TAnswer>()

function createOptions() {
  randomCards.value = getRandomElements(cards, 5)
  const cardTypes = randomCards.value.map(card => card.type)

  const result = Hand.solve(cardTypes)
  const randomAnswers = getRandomElements(hands, 2, result.name)
  console.log({ result })
  const shuffledAnswers: string[] = shuffleElements([result.name, ...randomAnswers])

  options.value = shuffledAnswers.map((answer) => ({
    item: answer,
    label: answer,
    onClick: (answer: string) => handleAnswer(answer, result.name)
  }));

}

function handleAnswer(answer: string, correctAnswer: string) {
  if(!game.gameState.value) return
  if (answer === correctAnswer) {
    game.timeLeft.value += 10;
    if (game.timeLeft.value > 100) {
      game.timeLeft.value = 100;
    }
    game.gameState.value.score++
    answerState.value = 'correct'
  } else {
    game.timeLeft.value -= 20;
    answerState.value = 'incorrect'
  }
  game.gameState.value.status = 'idle'

  overlayTimerId = setTimeout(() => {
    if(!game.gameState.value) return
    game.gameState.value.status = 'in-progress';
    answerState.value = undefined;
    createOptions();
  }, 2000);

}

onMounted(() => {
  createOptions();
});

onBeforeUnmount(() => {
  clearTimeout(overlayTimerId)
});


</script>

<template>
  <AnswerResult v-if="game.gameState.value?.status === 'idle'" :answer="answerState" />
  <template v-else>
    <InformationBanner />
    <Container height="h-[calc(100vh-295px)]" class="mt-16 pt-8 sm:h-[calc(100vh-152px)]">
      <Flex justify="center" align="center" height="h-full">
        <CommunityCards :cards="randomCards" />
      </Flex>
    </Container>
    <ControlPanel :options="options" />
  </template>

</template>