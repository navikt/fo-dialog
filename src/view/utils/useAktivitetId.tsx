import queryString from 'query-string';
import { useLocation, useParams } from 'react-router';

import { DialogData } from '../../utils/Typer';
import { MaybeAktivitet, findAktivitet, useAktivitetContext } from '../AktivitetProvider';
import { useDialog, useDialoger } from '../DialogProvider';

function getFirst(maybeArray: string | (string | null)[]): string | undefined {
    if (Array.isArray(maybeArray)) {
        const first = maybeArray[0];
        return first ?? undefined;
    }
    return maybeArray;
}

export function useAktivitetId(): string | undefined {
    const location = useLocation();
    const { aktivitetId } = queryString.parse(location.search);
    return aktivitetId ? getFirst(aktivitetId) : undefined;
}

export const useSelectedAktivitet = (): MaybeAktivitet => {
    const dialog = useSelectedDialog();
    const aktivitetData = useAktivitetContext();
    const aktivitetId = useAktivitetId() ?? dialog?.aktivitetId;
    return findAktivitet(aktivitetData, aktivitetId);
};
export const useSelectedDialog = (): DialogData | undefined => {
    const params = useParams();
    const { dialogId } = params;
    if (!dialogId) return;
    const selectedDialog = useDialog(dialogId);
    return selectedDialog;
};
