export const APP_NAME = 'arbeidsrettet-dialog';

export const TEAM_NAME = 'team-dab';

export const USE_HASH_ROUTER = import.meta.env.VITE_USE_HASH_ROUTER === 'true';
export const USE_MOCK = import.meta.env.DEV || USE_HASH_ROUTER;

export const minsideUrl = import.meta.env.VITE_MINSIDE_URL as string;
export const arbeidssokerregistreringUrl = import.meta.env.VITE_MINSIDE_URL as string;
export const aktivtetsplanUrl = import.meta.env.VITE_AKTIVITETSPLAN_URL as string;
