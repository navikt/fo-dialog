import { MouseEvent } from 'react';

import { AKTIVITETSPLAN_URL } from '../../constants';

export const aktivitetLenke = (aktivitetId: string) => {
    return `${AKTIVITETSPLAN_URL || ''}/aktivitet/vis/${aktivitetId}`;
};

export const visAktivitetsplan = (aktivitetID: string) => (event: MouseEvent) => {
    event.preventDefault();
    window.history.replaceState({}, 'aktivitetsplan', `/aktivitet/vis/${aktivitetID}`);
    window.dispatchEvent(new CustomEvent('visAktivitetsplan', { detail: aktivitetID }));
};
