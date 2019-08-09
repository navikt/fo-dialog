import { format } from 'date-fns';
import * as norweigianLocale from 'date-fns/locale/nb';

export function formaterDateAndTime(sendtDate: string) {
    return format(new Date(sendtDate), 'DD.MM.YYYY HH:mm', { locale: norweigianLocale });
}

export function formaterDate(date: string) {
    return formaterDateAndTime(date).substring(0, 10);
}

export function konverterMinutterTilTimer(minutter: number): string {
    const timer = Math.floor(minutter / 60);
    const remaining_minutter = minutter % 60;

    const returnValue =
        remaining_minutter.toString().length === 1
            ? '0' + remaining_minutter.toString()
            : remaining_minutter.toString();

    return `${timer}:${returnValue}`;
}
