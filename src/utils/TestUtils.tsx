export function mockFetch(response: any) {
    const mockJsonPromise = Promise.resolve(response);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise
    });
    //@ts-ignore
    return jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
}
