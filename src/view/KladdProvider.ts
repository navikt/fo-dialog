import { valueOrNull } from '../utils/TypeHelper';
import { KladdData, StringOrNull } from '../utils/Typer';
import { Status } from '../api/typer';

export interface KladdStore {
    kladder: KladdData[] | undefined;
    oppdaterKladd: (kladd: KladdData & { fnr: string | undefined }) => void;
    slettKladd: (dialogId: string | undefined | null, aktivitetId: string | undefined | null) => void;
    kladdStatus: Status;
}

export function eqKladd(kladd: KladdData, dialogId?: StringOrNull, aktivitetId?: StringOrNull): boolean {
    const dId = valueOrNull(dialogId);
    const aId = valueOrNull(aktivitetId);

    if (dialogId) {
        return kladd.dialogId === dId;
    }

    return kladd.dialogId === null && kladd.aktivitetId === aId;
}

export function findKladd(
    kladder: KladdData[],
    dialogId?: StringOrNull,
    aktivitetId?: StringOrNull
): KladdData | undefined {
    return kladder.find((k) => eqKladd(k, dialogId, aktivitetId));
}
