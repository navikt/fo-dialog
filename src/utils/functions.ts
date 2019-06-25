import {StringOrUndefinedOrNull} from "./typer";

export function getFormattedDate(sendtDate: StringOrUndefinedOrNull){
    const date: Date | null = (sendtDate === (undefined || null)) ? null : new Date(sendtDate!);
    if(date == null ) return ''
    const day: string  = date.getDay() < 10 ? `0${date.getDay()}` : `${date.getDay()}`
    const month: string = date.getMonth() < 10 ? `0${date.getMonth()}` : `${date.getMonth()}`
    const hours: string = date.getHours() < 10 ? `0${date.getHours()}`: `${date.getHours()}`
    const minutes: string = date.getMinutes() < 10 ? `0${date.getMinutes()}`: `${date.getMinutes()}`
    return `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}`
}