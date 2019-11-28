import React from 'react';
import { mount } from 'enzyme';
import { AktivitetskortPreview, getInfoText } from './AktivitetskortPreview';
import { AktivitetTypes } from '../../utils/AktivitetTypes';
import * as UseAktivitet from '../../api/UseAktivitet';
import '../../utils/SetupEnzyme';

describe('getInfoText', () => {
    it('skal returnere korrekt tekst for stillingsaktivitet', () => {
        const aktivitet: any = {
            type: AktivitetTypes.STILLING,
            tilDato: '2019-10-24T15:44:21.993+02:00',
            arbeidsgiver: 'Testesen'
        };

        const text = getInfoText(aktivitet);
        expect(text).toEqual('Stilling / Testesen');
    });

    it('skal returnere korrekt tekst for møteaktivitet', () => {
        const aktivitet: any = {
            type: AktivitetTypes.MOTE,
            fraDato: '2019-10-24T15:44:21.993+02:00'
        };

        const text = getInfoText(aktivitet);
        expect(text).toEqual('Møte med NAV / 24.10.2019 / 15:44');
    });

    it('skal returnere korrekt tekst for søkeavtale', () => {
        const aktivitet: any = {
            type: AktivitetTypes.SOKEAVTALE,
            tilDato: '2019-10-25T15:44:21.993+02:00',
            fraDato: '2019-10-24T15:44:21.993+02:00'
        };

        const text = getInfoText(aktivitet);
        expect(text).toEqual('24.10.2019 - 25.10.2019');
    });

    it('skal returnere korrekt tekst for medisinsk behandling', () => {
        const aktivitet: any = {
            type: AktivitetTypes.BEHANDLING,
            behandlingType: 'Kiropraktor'
        };

        const text = getInfoText(aktivitet);
        expect(text).toEqual('Kiropraktor');
    });

    it('skal returnere korrekt tekst for møteaktivitet', () => {
        const aktivitet: any = {
            type: AktivitetTypes.SAMTALEREFERAT,
            fraDato: '2019-10-24T15:44:21.993+02:00'
        };

        const text = getInfoText(aktivitet);
        expect(text).toEqual('Samtalereferat / 24.10.2019');
    });
});

describe('<AktivitetskortPreview />', () => {
    it('skal rendre stillingsaktivitet som i snapshot', () => {
        const dialog: any = {
            aktivitetId: '123'
        };

        const aktivitet: any = {
            tittel: 'Kantinemedarbeider',
            id: dialog.aktivitetId,
            type: AktivitetTypes.STILLING,
            tilDato: '2019-10-24T15:44:21.993+02:00',
            arbeidsgiver: 'Testesen'
        };

        jest.spyOn(UseAktivitet, 'useFindAktivitet').mockReturnValue((a: any) => {
            return a === '123' ? aktivitet : undefined;
        });

        const wrapper = mount(<AktivitetskortPreview dialog={dialog} />);
        expect(wrapper).toMatchSnapshot();
    });
});
