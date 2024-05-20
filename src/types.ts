import type {ComputedRef, Ref, WritableComputedRef } from "vue";

type TGameStatus = "pre-game" | "in-progress" | "idle" | "completed"

export type TAnswer = "correct" | 'incorrect'

export type TGameState = {
    id: string;
    time: number;
    score: number;
    status: TGameStatus
}

export type TGame = {
    gameState: Ref<TGameState>
    totalTime: Ref<number>
    timeLeft: WritableComputedRef<number>
    startGame: () => void
}

export type CardKey = '2s' | '2h' | '2d' | '2c' | '3s' | '3h' | '3d' | '3c' | '4s' | '4h' | '4d' | '4c' | '5s' | '5h' | '5d' | '5c' | '6s' | '6h' | '6d' | '6c' | '7s' | '7h' | '7d' | '7c' | '8s' | '8h' | '8d' | '8c' | '9s' | '9h' | '9d' | '9c' | '10s' | '10h' | '10d' | '10c' | 'Js' | 'Jh' | 'Jd' | 'Jc' | 'Qs' | 'Qh' | 'Qd' | 'Qc' | 'Ks' | 'Kh' | 'Kd' | 'Kc' | 'As' | 'Ah' | 'Ad' | 'Ac';

export type TCard = {
    type: CardKey
    face: string
}

export type TOptions = {
    item: string,
    label: string,
    onClick: (value: string) => void
}
