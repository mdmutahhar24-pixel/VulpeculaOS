import { HorrorEffect } from "./happinessEffect";
import { HorrorEvent } from "./happinessEvents";
import { HorrorState } from "./happinessState";

export type HorrorAction =
    | "OPEN_TERMINAL"
    | "OPEN_FILES"
    | "OPEN_NOTES"
    | "OPEN_VULP";


export class HorrorController {
    private state: HorrorState;
    private events: HorrorEvent[];

    constructor(initialState: HorrorState, events: HorrorEvent[]) {
        this.state = initialState;
        this.events = events;
    }

    recordAction(action: HorrorAction): HorrorEffect[] {
        this.state.actionsSinceLastEvent++;

        switch (action) {
            case "OPEN_TERMINAL":
                this.state.appsOpened++;
                this.state.terminalUsed = true;
                break;

            case "OPEN_FILES":
                this.state.appsOpened++;
                this.state.filesUsed = true;
                break;

            case "OPEN_NOTES":
                this.state.appsOpened++;
                this.state.notesUsed = true;
                break;

            case "OPEN_VULP":
                this.state.appsOpened++;
                this.state.vulpQuestioned = true;
                break;
        }

        return this.checkEvents();
    }

    private checkEvents(): HorrorEffect[] {
        const effects: HorrorEffect[] = [];

        for (const event of this.events) {
            if (this.state.eventsSeen.includes(event.id)) {
                continue;
            }

            if (this.state.level < event.minLevel) {
                continue;
            }

            if (!event.trigger(this.state)) {
                continue;
            }

            effects.push(...event.effects);

            this.state.eventsSeen.push(event.id);
        }

        return effects;
    }

    increaseLevel() {
        this.state.level++;
    }

    getLevel() {
        return this.state.level
    }

    getState() {
        return this.state;
    }

    updateSessionTime(seconds: number): HorrorEffect[] {
        this.state.sessionTime += seconds;
        return this.checkEvents();
    }
}