export interface ViewState {
    dialogInView?: string;
    newDialog: boolean;
    newHendvendelse: boolean;
}

export enum ViewAction {
    changeDialogInView,
    newHenvendelse,
    newDialog
}

export interface Action {
    type: ViewAction;
    payload?: string;
}

export const initalState: ViewState = {
    dialogInView: undefined,
    newDialog: false,
    newHendvendelse: false
};

export function reducer(state: ViewState, action: Action): ViewState {
    switch (action.type) {
        case ViewAction.changeDialogInView:
            //It means we changed from the new view
            if (!state.dialogInView) {
                return { ...initalState, dialogInView: action.payload, newDialog: state.newDialog };
            }
            return { ...initalState, dialogInView: action.payload };
        case ViewAction.newHenvendelse:
            return { ...state, newHendvendelse: true, newDialog: false };
        case ViewAction.newDialog:
            return { ...state, newDialog: true, newHendvendelse: false };
        default:
            throw new Error('not a valid action');
    }
}
