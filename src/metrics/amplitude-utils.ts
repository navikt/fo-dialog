import * as amplitude from '@amplitude/analytics-browser';

import { APP_NAME, TEAM_NAME } from '../constants';
import { track } from '@amplitude/analytics-browser';

type EventDataValue = string | boolean | number | null | undefined;

export function initAmplitude() {
    const apiKey = import.meta.env.VITE_AMPLITUDE_KEY ?? 'default';
    amplitude.init(apiKey, undefined, {
        serverUrl: import.meta.env.VITE_AMPLITUDE_API_URL,
        ingestionMetadata: {
            sourceName: window.location.toString()
        }
    });
}

export const logAmplitudeEvent = (eventName: string, data?: { [key: string]: EventDataValue }): void => {
    setTimeout(() => {
        data = {
            app: APP_NAME,
            team: TEAM_NAME,
            ...(data || {})
        };

        try {
            track(eventName, data);
        } catch (error) {
             
            console.error(error);
        }
    });
};

export const loggKlikkVisAktivitet = (enabledAfterClick: boolean) => {
    logAmplitudeEvent('toggle', { text: 'Vis aktivitet', enabledAfterClick });
};

export const loggKlikk = (eventType: string, verdi?: string, status?: string) => {
    logAmplitudeEvent('klikk', { eventType, verdi, status });
};
