export interface ViewState {
    dialogSomVises?: string;
    sistHandlingsType: HandlingsType;
}

export enum HandlingsType {
    ingen,
    nyHenvendelse,
    nyDialog
}

export const initalState: ViewState = {
    dialogSomVises: undefined,
    sistHandlingsType: HandlingsType.ingen
};

export function endreDialogSomVises(state?: ViewState, dialogId?: string): ViewState {
    if (state && !state.dialogSomVises) {
        return { ...initalState, dialogSomVises: dialogId, sistHandlingsType: state.sistHandlingsType };
    }

    return { ...initalState, dialogSomVises: dialogId };
}

export function sendtNyHenvendelse(state: ViewState): ViewState {
    return { ...state, sistHandlingsType: HandlingsType.nyHenvendelse };
}

export function sendtNyDialog(state: ViewState): ViewState {
    return { ...state, sistHandlingsType: HandlingsType.nyDialog };
}
