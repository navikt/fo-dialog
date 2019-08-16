import { format } from 'date-fns';
import * as norweigianLocale from 'date-fns/locale/nb';

export function formaterDateAndTime(sendtDate: string) {
    return format(new Date(sendtDate), 'DD.MM.YYYY HH:mm', { locale: norweigianLocale });
}

export function formaterDate(date: string) {
    return formaterDateAndTime(date).substring(0, 10);
}
