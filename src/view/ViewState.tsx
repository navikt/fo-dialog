import React, { Dispatch, SetStateAction, useCallback, useContext, useState } from 'react';

export interface ViewState {
    sistHandlingsType: HandlingsType;
}

export enum HandlingsType {
    ingen = 'INGEN',
    nyMelding = 'NY_MELDING',
    nyDialog = 'NY_DIALOG'
}

interface ViewContextType {
    viewState: ViewState;
    setViewState: Dispatch<SetStateAction<ViewState>>;
}

export const initalState: ViewState = {
    sistHandlingsType: HandlingsType.ingen
};
export const ViewContext = React.createContext<ViewContextType>({
    viewState: initalState,
    setViewState: () => {
        /* do nothing */
    }
});

export const ViewStateProvider = ({ children }: { children: React.ReactElement }) => {
    const [viewState, setState] = useState(initalState);
    const setViewState = useCallback(setState, [viewState]);
    return <ViewContext.Provider value={{ viewState, setViewState }}>{children}</ViewContext.Provider>;
};
export const useViewContext = () => useContext(ViewContext).viewState;
export const useSetViewContext = () => useContext(ViewContext).setViewState;

export function sendtNyMelding(state: ViewState): ViewState {
    // Trenger ikke skifte melding når man sender en ekstra melding i ny dialog, de er nesten like
    if (state.sistHandlingsType === HandlingsType.nyDialog) {
        return state;
    } else {
        return { sistHandlingsType: HandlingsType.nyMelding };
    }
}
