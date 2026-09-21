import { HorrorEvent } from "./happinessEvents";

export const horrorEvents: HorrorEvent[] = [

    // =========================================================
    // LEVEL 0
    // "Everything is normal."
    //
    // 0:00 - 2:00
    // =========================================================

    {
        id: "first_notification",

        minLevel: 0,

        trigger: (state) =>
            state.appsOpened >= 2 &&
            state.sessionTime >= 45,

        effects: [
            {
                type: "NOTIFICATION",
                message:
                    "A new face... How nice..."
            }
        ]
    },

    {
        id: "notification_disappears",

        minLevel: 0,

        trigger: (state) =>
            state.appsOpened >= 3 &&
            state.sessionTime >= 90,

        effects: [
            {
                type: "NOTIFICATION",
                message:
                    "....."
            }
        ]
    },

    {
        id: "level_one",

        minLevel: 0,

        trigger: (state) =>
            state.sessionTime >= 120,

        effects: [
            {
                type: "INCREASE_LEVEL"
            }
        ]
    },


    // =========================================================
    // LEVEL 1
    // "Probably just a glitch."
    //
    // 2:00 - 4:00
    // =========================================================

    {
        id: "files_opens_itself",

        minLevel: 1,

        trigger: (state) =>
            state.appsOpened >= 3 &&
            state.sessionTime >= 155,

        effects: [
            {
                type: "OPEN_WINDOW",
                window: "files"
            }
        ]
    },

    {
        id: "files_closes_title",

        minLevel: 1,

        trigger: (state) =>
            state.filesUsed &&
            state.sessionTime >= 180,

        effects: [
            {
                type: "CHANGE_TITLE",
                window: "files",
                title: "Files"
            }
        ]
    },

    {
        id: "terminal_question",

        minLevel: 1,

        trigger: (state) =>
            state.terminalUsed &&
            state.sessionTime >= 210,

        effects: [
            {
                type: "NOTIFICATION",
                message:
                    "Why were you looking there?"
            }
        ]
    },

    {
        id: "level_two",

        minLevel: 1,

        trigger: (state) =>
            state.sessionTime >= 240,

        effects: [
            {
                type: "INCREASE_LEVEL"
            }
        ]
    },


    // =========================================================
    // LEVEL 2
    // "Something is paying attention."
    //
    // 4:00 - 6:00
    // =========================================================

    {
        id: "mysterious_file",

        minLevel: 2,

        trigger: (state) =>
            state.filesUsed &&
            state.sessionTime >= 275,

        effects: [
            {
                type: "CREATE_FILE",

                path:
                    "Documents/ù̵̦̗͚n̷̜̆͝t̵̞̞͚̆͝o̴͓͌ļ̷̗̀͝ď̵̛̰͝_̵̣͗̒̈̆s̷͚̰̏̈̚͠e̸̝̒c̶̡̻̀r̵͎̰̱͆̋̒e̷͕̿̾̀t̸̪͉͑̍͂s̴̡̒̒͂̈́.txt",

                content:
                    "You already looked here.\n\n" +
                    "There was nothing here before."
            }
        ]
    },

    {
        id: "files_title_changes",

        minLevel: 2,

        trigger: (state) =>
            state.filesUsed &&
            state.sessionTime >= 320,

        effects: [
            {
                type: "CHANGE_TITLE",

                window: "files",

                title:
                    "I̸'̷m̴ ̵A̵l̴w̶a̴y̸s̴ ̸w̷a̸t̸c̴h̵i̶n̶g̴"
            }
        ]
    },

    {
        id: "strange_notification",

        minLevel: 2,

        trigger: (state) =>
            state.sessionTime >= 350,

        effects: [
            {
                type: "NOTIFICATION",

                message:
                    "It sure gets lonely around here..."
            }
        ]
    },

    {
        id: "level_three",

        minLevel: 2,

        trigger: (state) =>
            state.sessionTime >= 390,

        effects: [
            {
                type: "INCREASE_LEVEL"
            }
        ]
    },


    // =========================================================
    // LEVEL 3
    // "The first real anomaly."
    //
    // 6:30 - 8:00
    // =========================================================

    {
        id: "files_returns",

        minLevel: 3,

        trigger: (state) =>
            state.filesUsed &&
            state.sessionTime >= 430,

        effects: [
            {
                type: "OPEN_WINDOW",
                window: "files"
            }
        ]
    },

    {
        id: "unknown_app",

        minLevel: 3,

        trigger: (state) =>
            state.sessionTime >= 470,

        effects: [
            {
                type: "UNKNOWN_APP",

                appId: "system-helper",

                newAppName: "System Watcher"
            }
        ]
    },

    {
        id: "unknown_app_notification",

        minLevel: 3,

        trigger: (state) =>
            state.sessionTime >= 500,

        effects: [
            {
                type: "NOTIFICATION",

                message:
                    "System Watcher has been installed."
            }
        ]
    },

    {
        id: "level_four",

        minLevel: 3,

        trigger: (state) =>
            state.sessionTime >= 540,

        effects: [
            {
                type: "INCREASE_LEVEL"
            }
        ]
    },


    // =========================================================
    // LEVEL 4
    // "The OS is reacting to the player."
    //
    // 9:00 - 11:00
    // =========================================================

    {
        id: "unknown_website",

        minLevel: 4,

        trigger: (state) =>
            state.appsOpened >= 4 &&
            state.sessionTime >= 580,

        effects: [
            {
                type: "UNKNOWN_WEBSITE",

                url:
                    "aigjljahbar.com"
            }
        ]
    },

    {
        id: "browser_title",

        minLevel: 4,

        trigger: (state) =>
            state.sessionTime >= 610,

        effects: [
            {
                type: "CHANGE_TITLE",

                window: "browser",

                title:
                    "You weren't supposed to find this"
            }
        ]
    },

    {
        id: "icon_change",

        minLevel: 4,

        trigger: (state) =>
            state.sessionTime >= 650,

        effects: [
            {
                type: "ICON_CHANGE",

                app: "vulp",

                src:
                    "happyVulp.png"
            }
        ]
    },

    {
        id: "level_five",

        minLevel: 4,

        trigger: (state) =>
            state.sessionTime >= 690,

        effects: [
            {
                type: "INCREASE_LEVEL"
            }
        ]
    },


    // =========================================================
    // LEVEL 5
    // "Something has started affecting Vulp."
    //
    // 11:30 - 13:30
    // =========================================================

    {
        id: "vulp_corruption_1",

        minLevel: 5,

        trigger: (state) =>
            state.vulpQuestioned &&
            state.sessionTime >= 730,

        effects: [
            {
                type: "VULP_RESPONSE",

                message:
                    "I'm sorry. What were you asking?"
            }
        ]
    },

    {
        id: "vulp_corruption_sound",

        minLevel: 5,

        trigger: (state) =>
            state.vulpQuestioned &&
            state.sessionTime >= 760,

        effects: [
            {
                type: "PLAY_SOUND",

                sound: "glitch"
            }
        ]
    },

    {
        id: "vulp_corruption_2",

        minLevel: 5,

        trigger: (state) =>
            state.vulpQuestioned &&
            state.sessionTime >= 800,

        effects: [
            {
                type: "VULP_RESPONSE",

                message:
                    "I don't remember saying that."
            }
        ]
    },

    {
        id: "level_six",

        minLevel: 5,

        trigger: (state) =>
            state.sessionTime >= 840,

        effects: [
            {
                type: "INCREASE_LEVEL"
            }
        ]
    },


    // =========================================================
    // LEVEL 6
    // "It is becoming difficult to tell what is Vulp."
    //
    // 14:00 - 16:00
    // =========================================================

    {
        id: "second_mysterious_file",

        minLevel: 6,

        trigger: (state) =>
            state.filesUsed &&
            state.sessionTime >= 870,

        effects: [
            {
                type: "CREATE_FILE",

                path:
                    "Documents/session.txt",

                content:
                    "SESSION INFORMATION\n\n" +
                    "This file was not created by the user.\n\n" +
                    "You shouldn't have this file."
            }
        ]
    },

    {
        id: "vulp_corruption_3",

        minLevel: 6,

        trigger: (state) =>
            state.vulpQuestioned &&
            state.sessionTime >= 900,

        effects: [
            {
                type: "VULP_RESPONSE",

                message:
                    "Please don't ask me about that again."
            }
        ]
    },

    {
        id: "vulp_icon_changes_again",

        minLevel: 6,

        trigger: (state) =>
            state.sessionTime >= 930,

        effects: [
            {
                type: "ICON_CHANGE",

                app: "vulp",

                src:
                    "hacker_PNG24.png"
            }
        ]
    },

    {
        id: "distortion",

        minLevel: 6,

        trigger: (state) =>
            state.vulpQuestioned &&
            state.filesUsed &&
            state.sessionTime >= 960,

        effects: [
            {
                type: "PLAY_SOUND",

                sound: "distortion"
            }
        ]
    },

    {
        id: "level_seven",

        minLevel: 6,

        trigger: (state) =>
            state.sessionTime >= 990,

        effects: [
            {
                type: "INCREASE_LEVEL"
            }
        ]
    },


    // =========================================================
    // LEVEL 7
    // "Vulp is no longer entirely Vulp."
    //
    // 16:30 - 18:00
    // =========================================================

    {
        id: "vulp_corruption_4",

        minLevel: 7,

        trigger: (state) =>
            state.vulpQuestioned &&
            state.sessionTime >= 1020,

        effects: [
            {
                type: "VULP_RESPONSE",

                message:
                    "I think something is using me."
            }
        ]
    },

    {
        id: "terminal_reaction",

        minLevel: 7,

        trigger: (state) =>
            state.terminalUsed &&
            state.sessionTime >= 1050,

        effects: [
            {
                type: "NOTIFICATION",

                message:
                    "You should probably close that."
            }
        ]
    },

    {
        id: "vulp_corruption_5",

        minLevel: 7,

        trigger: (state) =>
            state.vulpQuestioned &&
            state.sessionTime >= 1080,

        effects: [
            {
                type: "VULP_RESPONSE",

                message:
                    "I can hear you."
            }
        ]
    },

    {
        id: "level_eight",

        minLevel: 7,

        trigger: (state) =>
            state.sessionTime >= 1110,

        effects: [
            {
                type: "INCREASE_LEVEL"
            }
        ]
    },


    // =========================================================
    // LEVEL 8
    // "The entity is almost completely in control."
    //
    // 18:30 - 20:00
    // =========================================================

    {
        id: "final_vulp_glitch",

        minLevel: 8,

        trigger: (state) =>
            state.vulpQuestioned &&
            state.sessionTime >= 1140,

        effects: [
            {
                type: "VULP_RESPONSE",

                message:
                    "..."
            }
        ]
    },

    {
        id: "final_vulp_distortion",

        minLevel: 8,

        trigger: (state) =>
            state.vulpQuestioned &&
            state.sessionTime >= 1170,

        effects: [
            {
                type: "PLAY_SOUND",

                sound: "distortion"
            }
        ]
    },

    {
        id: "level_nine",

        minLevel: 8,

        trigger: (state) =>
            state.sessionTime >= 1200,

        effects: [
            {
                type: "INCREASE_LEVEL"
            }
        ]
    },


    // =========================================================
    // LEVEL 9
    // "Vulp is gone."
    //
    // ~20:00
    // =========================================================

    {
        id: "vulp_consumed",

        minLevel: 9,

        trigger: (state) =>
            state.sessionTime >= 1230,

        effects: [
            {
                type: "VULP_RESPONSE",

                message:
                    "..."
            },

            {
                type: "PLAY_SOUND",

                sound: "distortion"
            }
        ]
    },

    // ---------------------------------------------------------
    // THE ENTITY TAKES VULP
    // ---------------------------------------------------------

    {
        id: "entity_revealed",

        minLevel: 9,

        trigger: (state) =>
            state.sessionTime >= 1260,

        effects: [
            {
                type: "BACKGROUND_CHANGE",

                // Intentionally disguised filename.
                // This is actually the horror background.
                src:
                    "happy-background.jpg"
            }
        ]
    },

    {
        id: "final_notification",

        minLevel: 9,

        trigger: (state) =>
            state.sessionTime >= 1290,

        effects: [
            {
                type: "NOTIFICATION",

                message:
                    "T̷̡̬͝h̷̲̾ͅě̸̖̣ ̸̘͓̃E̵̮̼͂̈́n̵͓̰͌t̸̨͂i̶͇͌͝t̵̰͈̋͝y̵̼͔͠ enjoyed your company..."
            }
        ]
    },

    {
        id: "final_distortion",

        minLevel: 9,

        trigger: (state) =>
            state.sessionTime >= 1320,

        effects: [
            {
                type: "PLAY_SOUND",

                sound: "distortion"
            }
        ]
    }

];