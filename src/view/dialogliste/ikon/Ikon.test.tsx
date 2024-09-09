import { describe } from 'vitest';
import { render } from '@testing-library/react';
import { DialogData } from '../../../utils/Typer';
import Ikon from './Ikon';
import React from 'react';

const dialogUtenAktivitet: DialogData = {
    ferdigBehandlet: false,
    venterPaSvar: false,
    historisk: false,
    id: '1',
    aktivitetId: null,
    egenskaper: [],
    erLestAvBruker: false,
    henvendelser: [],
    lest: false,
    lestAvBrukerTidspunkt: null,
    opprettetDato: null,
    overskrift: 'Overskrift',
    sisteDato: null,
    sisteTekst: 'asdfs'
};

describe('Ikon (DialogPreviewIkon)', () => {
    it('dialog med aktivitet', () => {
        render(<Ikon dialog={dialogUtenAktivitet} />);
    });

    it('dialog uten aktivitet', () => {
        render(<Ikon dialog={dialogUtenAktivitet} />);
    });
});
