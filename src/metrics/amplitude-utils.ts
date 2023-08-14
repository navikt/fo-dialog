import amplitude from 'amplitude-js';

import { APP_NAME, TEAM_NAME } from '../constants';

type EventDataValue = string | boolean | number | null | undefined;

export const initAmplitude = (): void => {
    const apiKey: string = import.meta.env.VITE_AMPLITUDE_KEY ?? 'default';

    amplitude.getInstance().init(apiKey, '', {
        apiEndpoint: import.meta.env.VITE_AMPLITUDE_API_URL,
        saveEvents: false,
        includeUtm: true,
        includeReferrer: true,
        platform: window.location.toString()
    });
};

export const logAmplitudeEvent = (eventName: string, data?: { [key: string]: EventDataValue }): void => {
    setTimeout(() => {
        data = {
            app: APP_NAME,
            team: TEAM_NAME,
            ...(data || {})
        };

        try {
            amplitude.getInstance().logEvent(eventName, data);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    });
};

export const loggKlikk = (eventType: string, verdi?: string, status?: string) => {
    logAmplitudeEvent('klikk', { eventType, verdi, status });
};
