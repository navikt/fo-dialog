import { differenceInHours, differenceInMinutes, format } from 'date-fns';
import { nb } from 'date-fns/locale';

import { ValueOrNull } from './Typer';

const locale = { locale: nb };

export function compareDates(adato: string, bdato: string): number {
    return adato > bdato ? -1 : adato === bdato ? 0 : 1;
}

export function formaterDateAndTime(sendtDate: ValueOrNull<string>): string {
    if (!sendtDate) return '';
    return format(new Date(sendtDate), 'dd.MM.yyyy HH:mm', locale);
}

export function formaterDate(dato: ValueOrNull<string>): string {
    if (!dato) return '';
    return format(new Date(dato), 'dd.MM.yyyy', locale);
}

export function getKlokkeslett(dato: ValueOrNull<string>): string {
    if (!dato) return '';
    return format(new Date(dato), 'HH:mm', locale);
}

export function getVarighet(fraDato: ValueOrNull<string>, tilDato: ValueOrNull<string>): string {
    if (!fraDato || !tilDato) return '';

    const padStart = (min: number) => (min < 10 ? `0${min}` : min);

    const fraDatoDate = new Date(fraDato);
    const tilDatoDate = new Date(tilDato);
    const hourDiff = differenceInHours(tilDatoDate, fraDatoDate);
    const minuteDiff = padStart(differenceInMinutes(tilDatoDate, fraDatoDate) % 60);

    return `${hourDiff}:${minuteDiff}`;
}
