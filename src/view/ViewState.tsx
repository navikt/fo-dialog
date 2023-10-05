import React, { Dispatch, SetStateAction, useContext, useState } from 'react';

export interface ViewState {
    dialogSomVises?: string;
    sistHandlingsType: HandlingsType;
}

export enum HandlingsType {
    ingen,
    nyMelding,
    nyDialog
}

interface ViewContextType {
    viewState: ViewState;
    setViewState: Dispatch<SetStateAction<ViewState>>;
}

export const initalState: ViewState = {
    dialogSomVises: undefined,
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
    return (
        <ViewContext.Provider value={{ viewState: viewState, setViewState: setState }}>{children}</ViewContext.Provider>
    );
};
export const useViewContext = () => useContext(ViewContext);

export function endreDialogSomVises(state?: ViewState, dialogId?: string): ViewState {
    if (state && !state.dialogSomVises) {
        return { ...initalState, dialogSomVises: dialogId, sistHandlingsType: state.sistHandlingsType };
    }

    return { ...initalState, dialogSomVises: dialogId };
}

export function sendtNyMelding(state: ViewState): ViewState {
    return { ...state, sistHandlingsType: HandlingsType.nyMelding };
}

export function sendtNyDialog(state: ViewState): ViewState {
    return { ...state, sistHandlingsType: HandlingsType.nyDialog };
}
