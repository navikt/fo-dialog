import { format } from 'date-fns';
import * as norweigianLocale from 'date-fns/locale/nb';

export function formaterDate(sendtDate: string) {
    return format(new Date(sendtDate), 'DD.MM.YYYY HH:mm', { locale: norweigianLocale });
}
