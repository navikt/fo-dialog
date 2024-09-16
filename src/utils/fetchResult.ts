type Mapper<FromType, ToType> = (arg: FromType) => Promise<ToType>;

export class Ok<T, Error = never> {
    isSuccess: true;
    response: T;
    constructor(response: T) {
        this.isSuccess = true;
        this.response = response;
    }
    flatMap<NextType, PotentialError>(
        map: (arg: T) => Result<NextType, PotentialError>
    ): Result<NextType, PotentialError | Error> {
        return map(this.response);
    }
    async mapSuccess<NextType>(map: Mapper<T, NextType>) {
        const nextSuccess = await map(this.response);
        return new Ok<NextType>(nextSuccess);
    }
}
export class Failure<Error, T = never> {
    isSuccess: false;
    error: Error;
    constructor(error: Error) {
        this.isSuccess = false;
        this.error = error;
    }
    flatMap<ToType, PotentialError>(
        _: (arg: T) => Result<ToType, PotentialError>
    ): Result<ToType, Error | PotentialError> {
        return new Failure<Error | PotentialError, ToType>(this.error);
    }
    async mapSuccess<FromType, NextType>(map: Mapper<FromType, NextType>) {
        return new Failure(this.error);
    }
}
export type Result<Value, Error> = Ok<Value, Error> | Failure<Error, Value>;

export const ok = <T>(response: T) => {
    return new Ok<T>(response);
};
export const fail = <Error>(error: Error) => {
    return new Failure<Error>(error);
};
export function isOk<Value, Error>(httpResult: Result<Value, Error>): httpResult is Ok<Value, Error> {
    return httpResult.isSuccess;
}

class GraphqlError extends Error {}
class NetworkError extends Error {}
class AuthError extends Error {}

const doSometihng = (val: number) => {
    if (val > 1) return fail(new GraphqlError('lol'));
    if (val > 2) return fail(new NetworkError('lol'));
    if (val > 3) return fail(new AuthError('lol'));
    return ok(val + 1);
};

const test = () => {
    const lol = ok(-1).flatMap(doSometihng).flatMap(doSometihng).flatMap(doSometihng);
};
