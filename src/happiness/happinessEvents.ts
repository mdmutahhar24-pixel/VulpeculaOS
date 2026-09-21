import { HorrorEffect } from "./happinessEffect";
import { HorrorState } from "./happinessState";

export interface HorrorEvent {
    id: string;
    minLevel: number;
    trigger: (state: HorrorState) => boolean;
    effects: HorrorEffect[];
}