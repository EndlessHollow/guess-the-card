<script setup lang="ts">
import { computed } from "vue";

import Flex from "@ui/layout/flex";
import Container from "@ui/layout/container";
import Text from "@ui/typography/text";

import ProgressBar from "primevue/progressbar";

import { getFormattedTime } from "@helpers/get-formatted-time";
import { injectStrict } from "@helpers/inject-strict";

import { gameKey } from "@/keys";
import type { TGame } from "@/types";

const game = injectStrict<TGame>(gameKey);

const formattedTotalTime = getFormattedTime(game.totalTime.value);
const formattedTimeLeft = computed(() => getFormattedTime(game.timeLeft.value));
</script>

<template>
  <Flex class="fixed z-10 h-16 w-full top-0 left-0 bg-white shadow">
    <Container>
      <Flex justify="between" align="center" height="h-full">
        <ProgressBar :value="game.timeLeft.value" class="flex-1"
          >{{ formattedTimeLeft }}/{{ formattedTotalTime }}</ProgressBar
        >
        <Flex align="center" justify="end" gap="1" class="flex-1">
          <Text weight="medium">Score:</Text>
          <Text>{{ game.gameState.value?.score }}</Text>
        </Flex>
      </Flex>
    </Container>
  </Flex>
</template>
