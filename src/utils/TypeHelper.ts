export function valueOrNull<T>(val?: T): T | null {
    if (val === undefined) {
        return null;
    }
    return val;
}

export function valueOrUndefined<T>(val?: T): T | undefined {
    if (val === null) {
        return undefined;
    }
    return val;
}
