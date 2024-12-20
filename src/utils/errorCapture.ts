/* Capture error without importing sentry */

/* Make sure to not import sentry for types, just create a similar type */
declare const window: {
    captureException: (exception: any) => void;
    captureMessage: (message: string) => void;
};

export const captureException = (exception: any) => {
    if (window.captureException) {
        window.captureException(exception);
    }
};
export const captureMessage = (message: string) => {
    if (window.captureMessage) {
        window.captureMessage(message);
    }
};
