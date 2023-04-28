import '../polyfill';

import.meta.env.BASE_URL = 'http://localhost:3000';

vi.mock('../felleskomponenter/logging', () => ({
    default: vi.fn()
}));
