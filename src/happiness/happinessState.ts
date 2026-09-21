export interface HorrorState {
    level: number;
    eventsSeen: string[];

    appsOpened: number;

    terminalUsed: boolean;
    filesUsed: boolean;
    notesUsed: boolean;
    vulpQuestioned: boolean;

    sessionTime: number;

    windowsOpened: number;
    actionsSinceLastEvent: number;
}