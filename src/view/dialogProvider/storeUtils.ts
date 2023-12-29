import { Status } from '../../api/typer';
import { DialogData } from '../../utils/Typer';
import { DialogRequestStore, DialogStore } from './dialogStore';

const nextStatus = {
    pending: Status.PENDING,
    fulfilled: Status.OK,
    rejected: Status.ERROR
};

export const sliceReducer = <SliceName extends keyof DialogRequestStore, T, E>(
    set: (setState: (store: DialogStore) => DialogStore, dontKnow: boolean, name: string) => void,
    sliceName: SliceName
) => {
    return (action: Action<T, E>) => {
        set(
            (prevState: DialogStore) => ({
                ...prevState,
                [sliceName]: {
                    ...prevState[sliceName],
                    status: nextStatus[action.type],
                    error: action.type === 'rejected' ? action.payload : undefined,
                    data: action.type === 'fulfilled' ? action.payload : prevState[sliceName].data
                }
            }),
            false,
            action.name
        );
    };
};

export interface RequestState<T> {
    status: Status;
    data: T;
    error: string | undefined;
}
export type HentDialogRequestState = RequestState<{ dialoger: DialogData[]; sistOppdatert: Date }>;

type FieldSetter<T, E> = (action: Action<T, E>) => void;
type Thunk<T> = () => Promise<T>;
export async function asyncThunk<T, E>(reducer: FieldSetter<T, E>, thunk: Thunk<T>, prefix: string) {
    try {
        console.log('Reducing');
        reducer({ name: `${prefix}/pending`, type: 'pending' });
        reducer({ name: `${prefix}/fulfilled`, type: 'fulfilled', payload: await thunk() });
    } catch (e) {
        reducer({ name: `${prefix}/rejected`, type: 'rejected', payload: e as E });
    }
}

interface SuccessAction<T> {
    type: 'fulfilled';
    payload: T;
    name: string;
}
interface ErrorAction<T> {
    type: 'rejected';
    payload: T;
    name: string;
}
interface InitAction {
    type: 'pending';
    name: string;
}
type Action<T, E> = SuccessAction<T> | ErrorAction<E> | InitAction;
