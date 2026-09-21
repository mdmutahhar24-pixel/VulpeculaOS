import click from "./Audio/click4.ogg"
import minimize from "./Audio/GUI_Sound_Effects_by_Lokif/misc_menu_4.wav"
import close from "./Audio/mixkit-mouse-click-close-1113.wav"
import notification from "./Audio/GUI_Sound_Effects_by_Lokif/positive.wav"
import error from "./Audio/GUI_Sound_Effects_by_Lokif/negative.wav"
import glitch from "./Audio/dragon-studio-glitch-effect-1-397982.mp3"
import distortion from "./Audio/se_oqpolog3rbvyx4om.wav"
import maximize from "./Audio/GUI_Sound_Effects_by_Lokif/negative_2.wav"
import typing from "./Audio/office-keyboard-24.wav"
import response from "./Audio/GUI_Sound_Effects_by_Lokif/sharp_echo.wav"

export const sounds = {
    ui: {
        click,
        minimize,
        maximize,
        close,
    },
    system: {
        notification,
        error
    },
    horror: {
        glitch,
        distortion
    },
    vulp: {
        typing,
        response
    }
} as const