export function valueOrNull<T>(val?: T): T | null {
    if (val === undefined) {
        return null;
    }
    return val;
}

export function notEmpty<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
}
