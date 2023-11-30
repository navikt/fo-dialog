import { AppState } from '../view/Provider';
import { Status } from '../api/typer';

const key = 'dialog-state';
export const getPreloadedStateFromSessionStorage = (fnr: string | undefined): AppState | undefined => {
    if (!fnr) return undefined;
    const serializedState = sessionStorage.getItem(key);
    if (serializedState) {
        try {
            const state: AppState = JSON.parse(serializedState);
            // Only use cache if correct user
            if (fnr === state.data.oppfolging?.data?.fnr) {
                return JSON.parse(serializedState);
            }
            sessionStorage.removeItem(key);
            return undefined;
        } catch (e) {
            console.warn(e);
            return undefined;
        }
    }
    return undefined;
};

export function localStorageProvider() {
    // When initializing, we restore the data from `localStorage` into a map.
    const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'));

    // Before unloading the app, we write back all the data into `localStorage`.
    window.addEventListener('beforeunload', () => {
        const appCache = JSON.stringify(Array.from(map.entries()));
        localStorage.setItem('app-cache', appCache);
    });

    // We still use the map for write & read for performance.
    return map;
}

enum LocalStorageElement {
    FNR = 'dialog-fnr'
}
export const settFnrILocalstorage = (fnr: string) => {};

export const getStatus = (data: any, isLoading: boolean, isValidating: boolean, error: any) => {
    if (isLoading) return Status.PENDING;
    if (isValidating) return Status.RELOADING;
    if (error) return Status.ERROR;
    if (!data) return Status.INITIAL;
    return Status.OK;
};
