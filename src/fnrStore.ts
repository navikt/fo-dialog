import { create } from 'zustand';

interface FnrStore {
    fnr: string | undefined;
    setFnr: (fnr: string | undefined) => void;
}

export const useFnrStore = create<FnrStore>((setState, _) => ({
    fnr: undefined,
    setFnr: (fnr: string | undefined) => setState({ fnr })
}));
