export interface VulpOSContext {
    openApps: string[];
    installedApps: string[];

    systemEvents: {
        type: string;
        description: string;
    }[];

    horrorLevel: number;
}