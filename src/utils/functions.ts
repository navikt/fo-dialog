

export function getFormattedDate(sendtDate: string){
    const date: Date = new Date(sendtDate!);
    const day: string  = date.getDay() < 10 ? `0${date.getDay()}` : `${date.getDay()}`
    const month: string = date.getMonth() < 10 ? `0${date.getMonth()}` : `${date.getMonth()}`
    const hours: string = date.getHours() < 10 ? `0${date.getHours()}`: `${date.getHours()}`
    const minutes: string = date.getMinutes() < 10 ? `0${date.getMinutes()}`: `${date.getMinutes()}`
    return `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}`
}