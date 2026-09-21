import { Sound } from "../audio/soundHandler";
import { HorrorEffect } from "./happinessEffect";

export type EffectHandlers = {
    showNotification: (message: string) => void;
    openWindow: (window: string) => void;
    changeTitle: (window: string, title: string) => void;
    changeBackground: (src: string) => void;
    changeIcon: (app: string, src: string) => void;
    playSound: (sound: Sound) => void;
    createUnknownApp: (appId: string, newAppName: string) => void;
    createUnknownWebsite: (url: string) => void;
    createNewFile: (path: string, content?: string) => void;
    vulpResponse: (message: string) => void;
    increaseLevel: () => void;
};

export class EffectExecutor {
    private handlers: EffectHandlers;

    constructor(handlers: EffectHandlers) {
        this.handlers = handlers;
    }

    execute(effect: HorrorEffect) {
        switch (effect.type) {
            case "NOTIFICATION":
                this.handlers.showNotification(effect.message);
                break;
            case "OPEN_WINDOW":
                this.handlers.openWindow(effect.window);
                break;
            case "CHANGE_TITLE":
                this.handlers.changeTitle(effect.window, effect.title);
                break;
            case "INCREASE_LEVEL":
                this.handlers.increaseLevel();
                break;
            case "BACKGROUND_CHANGE":
                this.handlers.changeBackground(effect.src);
                break;
            case "PLAY_SOUND":
                this.handlers.playSound(effect.sound)
                break;
            case "UNKNOWN_APP":
                this.handlers.createUnknownApp(effect.appId, effect.newAppName)
                break;
            case "UNKNOWN_WEBSITE":
                this.handlers.createUnknownWebsite(effect.url);
                break;
            case "CREATE_FILE":
                this.handlers.createNewFile(effect.path, effect.content);
                break;
            case "ICON_CHANGE":
                this.handlers.changeIcon(effect.app, effect.src)
                break;
            case "VULP_RESPONSE":
                this.handlers.vulpResponse(effect.message);
                break;
            default:
                console.log("Unhandled horror effect:", effect);
        }
    }

    executeAll(effects: HorrorEffect[]) {
        effects.forEach(effect => this.execute(effect));
    }
}