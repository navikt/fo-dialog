interface ImportMetaEnv {
    readonly STORYBOOK_USE_HASH_ROUTER: boolean;
    readonly MODE: string;
    readonly BASE_URL: string;
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly SSR: boolean;
    readonly VITE_USE_HASH_ROUTER: string | undefined;
    readonly VITE_DEKORATOR_URL: string;
    readonly VITE_AMPLITUDE_API_URL: string | undefined;
    readonly VITE_AMPLITUDE_KEY: string | undefined;
    readonly VITE_MINSIDE_URL: string | undefined;
    readonly VITE_ARBEIDSSOKERREGISTRERING_URL: string;
    readonly VITE_AKTIVITETSPLAN_URL: string;
    readonly VITE_DIALOG_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
