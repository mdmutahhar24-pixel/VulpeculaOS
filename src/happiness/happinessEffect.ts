import { Sound } from "../audio/soundHandler";

export type HorrorEffect =
    | { type: "OPEN_WINDOW"; window: string }
    | { type: "CHANGE_TITLE"; window: string; title: string }
    | { type: "NOTIFICATION"; message: string }
    | { type: "CREATE_FILE"; path: string; content?: string }
    | { type: "PLAY_SOUND"; sound: Sound }
    | { type: "VULP_RESPONSE"; message: string }
    | { type: "BACKGROUND_CHANGE"; src: string }
    | { type: "ICON_CHANGE"; app: string; src: string }
    | { type: "UNKNOWN_WEBSITE"; url: string }
    | { type: "UNKNOWN_APP"; appId: string; newAppName: string }
    | { type: "INCREASE_LEVEL" };