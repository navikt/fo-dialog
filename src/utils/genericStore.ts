import { create } from 'zustand';
import { isReloading, Status } from '../api/typer';
import { Result, isOk } from './Fetch';

type GenericStore<StoredDataType, ResultType extends StoredDataType, ArgType> = {
    status: Status;
    data: StoredDataType;
    error?: string;
    fetch: (arg: ArgType) => Promise<ResultType>;
};

export const createGenericStore = <StoredDataType, ArgType, ResultType extends StoredDataType>(
    initialData: StoredDataType,
    fetcher: (arg: ArgType) => Promise<HttpResult<ResultType, any>>
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
                const result = await fetcher(arg);
                if (isOk(result)) {
                    set({
                        data: result.response,
                        status: Status.OK
                    });
                    return result.response;
                } else {
                    set({
                        data: result.error,
                        status: Status.OK
                    });
                    return result.error;
                }
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
