import { formaterDate } from './date';

it('format 2018-11-21T13:13:20.663+01:00 to 21.11.2018 13:13', () => {
    expect(formaterDate('2018-11-21T13:13:20.663+01:00')).toBe('21.11.2018 13:13');
});
