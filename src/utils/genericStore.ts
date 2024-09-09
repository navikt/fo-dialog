import { create } from 'zustand';
import { isReloading, Status } from '../api/typer';

type GenericStore<StoredDataType, ResultType extends StoredDataType, ArgType> = {
    status: Status;
    data: StoredDataType;
    error?: string;
    fetch: (arg: ArgType) => Promise<ResultType>;
};

export const createGenericStore = <StoredDataType, ArgType, ResultType extends StoredDataType>(
    initialData: StoredDataType,
    fetcher: (arg: ArgType) => Promise<ResultType>
) => {
    return create<GenericStore<StoredDataType, ResultType, ArgType>>((set) => ({
        data: initialData,
        error: undefined,
        fetch: async (arg: ArgType) => {
            set((prevState) => ({
                ...prevState,
                status: isReloading(prevState.status) ? Status.RELOADING : Status.PENDING
            }));
            try {
                const data = await fetcher(arg);
                set({
                    data,
                    status: Status.OK
                });
                return data;
            } catch (e) {
                set({
                    error: e?.toString(),
                    status: Status.ERROR
                });
                return null as any;
            }
        },
        status: Status.INITIAL
    }));
};
