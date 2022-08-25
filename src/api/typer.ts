export enum Status {
    INITIAL,
    PENDING,
    RELOADING,
    OK,
    ERROR
}

export const isReloading = (status: Status) => status === Status.OK || status === Status.RELOADING;
export const isOk = (status: Status) => status === Status.OK;
export const isPending = (status: Status) => status === Status.PENDING;
export const isPendingOrReloading = (status: Status) => status === Status.PENDING || status === Status.RELOADING;
export const hasError = (status: Status) => status === Status.ERROR;
export const hasData = isReloading;
