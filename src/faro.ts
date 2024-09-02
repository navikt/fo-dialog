import { initializeFaro } from '@grafana/faro-web-sdk';

export enum Env {
    Local = 'local',
    Dev = 'dev',
    Prod = 'prod'
}

export const getEnv = (): Env => {
    // TODO: Dette vil ikke virke som internflate
    const { hostname } = window.location;
    if (hostname.includes('dev.nav.no')) return Env.Dev;
    if (hostname.includes('nav.no')) return Env.Prod;
    return Env.Local;
};

const endpoint = {
    [Env.Dev]: 'https://telemetry.nav.no/collect',
    [Env.Prod]: 'https://telemetry.ekstern.dev.nav.no/collect',
    [Env.Local]: 'http://localhost:12347/collect'
};

initializeFaro({
    url: endpoint[getEnv()], // required, see below
    app: {
        name: 'arbeidsrettet-dialog' // required
        // version: '1.2.3' // optional; useful in Grafana to get diff between versions
    }
});
