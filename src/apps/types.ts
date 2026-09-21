import type { LucideIcon } from "lucide-react";
import type { ReactNode, Dispatch, SetStateAction } from "react";
import type { Directory } from "../filesystem/filesystem";
import { WindowState } from "../App";

export type AppIcon =
    | {
        type: "lucide";
        icon: LucideIcon;
    }
    | {
        type: "image";
        src: string;
    };

export interface AppContext {
    filesystem: Directory;
    setFilesystem: Dispatch<SetStateAction<Directory>>;
    onAction: (action: string) => void;

    apps: DefineApp[];
    windows: Record<string, WindowState>;

    systemEvents: {
        type: string,
        description: string
    }[];
    vulpHorrorMes: string | null;

    horrorLevel: number;

    url: string;

    installApp: (appId: string) => void;
}

export interface DefineApp {
    id: string;
    name: string;
    icon: AppIcon;
    builtIn: boolean;
    installed: boolean;

    desc?: string;

    component?: (context: AppContext) => ReactNode;
}