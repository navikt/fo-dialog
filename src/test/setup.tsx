import '../polyfill';

vi.mock('../felleskomponenter/logging', () => ({
    default: vi.fn()
}));
