function getCookie(name: string) {
    const re = new RegExp(`${name}=([^;]+)`);
    const match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
}

function getHeaders() {
    // Hvis du legger til flere headers husk å whitelist headeren i ./utils/UseFetch.ts
    return {
        'Content-Type': 'application/json',
        'Nav-Consumer-Id': 'arbeidsrettet-dialog',
        NAV_CSRF_PROTECTION: getCookie('NAV_CSRF_PROTECTION') // eslint-disable-line quote-props
    };
}

export const REQUEST_CONFIG: RequestInit = {
    credentials: 'same-origin',
    headers: getHeaders()
};

export function fetchData<T>(url: string, config: RequestInit = {}): Promise<T> {
    return fetch(url, { ...config, ...REQUEST_CONFIG })
        .then(sjekkStatuskode)
        .then(toJson);
}

export function fnrQuery(fnr?: string): string {
    return fnr ? `?fnr=${fnr}` : '';
}

export function sjekkStatuskode(response: Response) {
    if (response.status >= 200 && response.status < 300 && response.ok) {
        return response;
    }
    throw new Error(response.statusText || response.type);
}

export function toJson(response: Response) {
    if (response.status !== 204) {
        // No content
        return response.json();
    }
    return response;
}

export function getPathnamePrefix(erVeileder?: boolean) {
    return erVeileder ? '' : process.env.PUBLIC_URL;
}
