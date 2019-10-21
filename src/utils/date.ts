import { format } from 'date-fns';
import * as norweigianLocale from 'date-fns/locale/nb';
import { ValueOrNull } from './typer';

const locale = { locale: norweigianLocale };

export function formaterDateAndTime(sendtDate: ValueOrNull<string>): string {
    if (!sendtDate) return '';
    return format(new Date(sendtDate), 'DD.MM.YYYY HH:mm', locale);
}

export function formaterDate(dato: ValueOrNull<string>): string {
    return formaterDateAndTime(dato).substring(0, 10);
}
