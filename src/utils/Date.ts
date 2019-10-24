import { differenceInHours, differenceInMinutes, format } from 'date-fns';
import * as norweigianLocale from 'date-fns/locale/nb';
import { ValueOrNull } from './Typer';

const locale = { locale: norweigianLocale };

export function formaterDateAndTime(sendtDate: ValueOrNull<string>): string {
    if (!sendtDate) return '';
    return format(new Date(sendtDate), 'DD.MM.YYYY HH:mm', locale);
}

export function formaterDate(dato: ValueOrNull<string>): string {
    if (!dato) return '';
    return format(new Date(dato), 'DD.MM.YYYY', locale);
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
    const minuteDiff = padStart(differenceInMinutes(tilDatoDate.setHours(0), fraDatoDate.setHours(0)));

    return `${hourDiff}:${minuteDiff}`;
}
