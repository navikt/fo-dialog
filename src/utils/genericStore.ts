import { create } from 'zustand';
import { isReloading, Status } from '../api/typer';

type GenericStore<T, ArgType = undefined> =
    | {
          status: Status;
          data: T;
          error?: string;
          fetch: () => Promise<void>;
      }
    | {
          status: Status;
          data: T;
          error?: string;
          fetch: (arg: ArgType) => Promise<void>;
      };

export const createGenericStore = <T, ArgType>(
    initialData: T,
    fetcher: (() => Promise<T>) | ((arg: ArgType) => Promise<T>)
) => {
    return create<GenericStore<T>>((set) => ({
        data: initialData,
        error: undefined,
        fetch: async (arg) => {
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
            } catch (e) {
                set({
                    error: e?.toString(),
                    status: Status.ERROR
                });
            }
        },
        status: Status.INITIAL
    }));
};
