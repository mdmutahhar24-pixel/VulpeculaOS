import { sounds } from "./sound";

export type Sound =
    | "click"
    | "minimize"
    | "close"
    | "maximize"
    | "notification"
    | "error"
    | "glitch"
    | "distortion"
    | "typing"
    | "response";

const soundMap: Record<Sound, string> = {
    click: sounds.ui.click,
    minimize: sounds.ui.minimize,
    close: sounds.ui.close,
    maximize: sounds.ui.maximize,
    notification: sounds.system.notification,
    error: sounds.system.error,
    glitch: sounds.horror.glitch,
    distortion: sounds.horror.distortion,
    typing: sounds.vulp.typing,
    response: sounds.vulp.response
};

let typingAudio: HTMLAudioElement | null = null;

export const playSound = (sound: Sound) => {
    const audio = new Audio(soundMap[sound]);

    audio.volume = 0.5;
    audio.play();
};

export const startTypingSound = () => {
    if (typingAudio) return;

    typingAudio = new Audio(soundMap.typing);
    typingAudio.loop = true;
    typingAudio.volume = 0.5;

    typingAudio.play();
};

export const stopTypingSound = () => {
    if (!typingAudio) return;

    typingAudio.pause();
    typingAudio.currentTime = 0;
    typingAudio = null;
};