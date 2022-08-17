import { getHeaders } from './UseFetch';

it('happy case', () => {
    const REQUEST_CONFIG: RequestInit = {
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Nav-Consumer-Id': 'arbeidsrettet-dialog',
            NAV_CSRF_PROTECTION: ''
        }
    };
    const result = getHeaders(REQUEST_CONFIG);
    const expected =
        '{"Content-Type":"application/json","Nav-Consumer-Id":"arbeidsrettet-dialog","NAV_CSRF_PROTECTION":""}';
    expect(result).toBe(expected);
});
