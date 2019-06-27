import { format } from 'date-fns';

export function getFormattedHenvendelseDate(sendtDate: string){
    const { format } = require('date-fns');
    const norweigianLocale = require('date-fns/locale/nb');
    return format(new Date(sendtDate), 'DD.MM.YYYY HH:mm', { locale: norweigianLocale } );
}