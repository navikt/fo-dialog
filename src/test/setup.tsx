import '../polyfill';

vi.mock('../felleskomponenter/logging', () => ({
    default: vi.fn()
}));
Element.prototype.scrollTo = () => {};
