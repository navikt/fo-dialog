export class GraphqlError extends Error {
    errors: { message: string }[];
    constructor(message: string, errors: { message: string }[]) {
        super(message);
        this.errors = errors;
    }
}

export class UnautorizedError extends Error {
    response: Response;
    constructor(response: Response) {
        super('Unauthorized request, session expired?');
        this.response = response;
    }
}

export class ForbiddenError extends Error {
    response: Response;
    constructor(response: Response) {
        super('Forbidden');
        this.response = response;
    }
}

export class ClientError extends Error {
    response: Response;
    body: string;
    constructor(response: Response, body: string) {
        super(`Client error: ${response.status}`);
        this.response = response;
        this.body = body;
    }
}

export class InternalServerError extends Error {
    response: Response;
    constructor(response: Response) {
        super(`InternalServerError: ${response.status}`);
        this.response = response;
    }
}

export class NetworkError extends Error {
    response: Response;
    constructor(response: Response) {
        super(`NetworkError`);
        this.response = response;
    }
}
