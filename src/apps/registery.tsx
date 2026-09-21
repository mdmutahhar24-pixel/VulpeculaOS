import {
    Folder,
    SquareTerminal,
    NotepadText,
    Globe,
    ShoppingBag,
    Calculator
} from "lucide-react";

import { DefineApp } from "./types";
import Files from "../components/Files";
import TerminalComponent from "../components/terminal";
import Notes from "../components/Notes";
import Browser from "../components/Browser";
import Vulp from "../components/Vulp";
import Store from "../components/Store";
import CalculatorComponent from "../components/CalculatorComponent";


export const appRegistry: DefineApp[] = [
    {
        id: "files",
        name: "Files",
        icon: { type: "lucide", icon: Folder },
        builtIn: true,
        installed: true,

        component: ({ filesystem, setFilesystem }) => ( <Files filesystem={filesystem} setFilesystem={setFilesystem} /> )
    },

    {
        id: "terminal",
        name: "Terminal",
        icon: {
            type: "lucide",
            icon: SquareTerminal
        },
        builtIn: true,

        installed: true,

        component: ({ filesystem, setFilesystem }) => ( <TerminalComponent filesystem={filesystem} setFilesystem={setFilesystem} /> )
    },

    {
        id: "notes",
        name: "Notes",
        icon: {
            type: "lucide",
            icon: NotepadText
        },
        builtIn: true,

        installed: true,

        component: ({ filesystem, setFilesystem }) => ( <Notes filesystem={filesystem} setFilesystem={setFilesystem} /> )
    },

    {
        id: "browser",
        name: "Browser",
        icon: {
            type: "lucide",
            icon: Globe
        },
        builtIn: true,

        installed: true,

        component: ({ url }) => <Browser url={url}/>
    },

    {
        id: "store",
        name: "Store",
        icon: {
            type: "lucide",
            icon: ShoppingBag
        },
        builtIn: true,
        installed: true,

        component: ({ installApp }) => (
            <Store onInstall={installApp} />
        )
    },

    {
        id: "vulp",
        name: "Vulp",
        icon: {
            type: "image",
            src: "logo.png"
        },
        builtIn: true,
        installed: true,

        component: ({ onAction, windows, systemEvents, vulpHorrorMes, horrorLevel }) => <Vulp vulpHorrorMes={vulpHorrorMes} horrorLevel={horrorLevel} onAction={onAction} windows={windows} systemEvents={systemEvents} />
    },

    {
        id: "calculator",
        name: "Calculator",
        icon: {
            type: "lucide",
            icon: Calculator
        },

        installed: false,

        desc: "A regular, old calculator app to well, do math.",

        builtIn: false,

        component: () => <CalculatorComponent />
    }
];