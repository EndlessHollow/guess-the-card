import type { InjectionKey } from "vue";
import type { TGame } from "./types";

export const gameKey: InjectionKey<TGame> = Symbol('Game')