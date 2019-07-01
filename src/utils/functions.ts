import { format } from 'date-fns';
import * as norweigianLocale from 'date-fns/locale/nb'
import {Component} from "react";

export function formaterHenvendelseDate(sendtDate: string){
    return format(new Date(sendtDate), 'DD.MM.YYYY HH:mm', { locale: norweigianLocale } );
}
