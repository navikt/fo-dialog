import React, { MouseEvent } from 'react';

import { AKTIVITETSPLAN_URL } from '../../constants';
import { getContextPath } from '../utils/utils';

export const aktivitetLenke = (aktivitetId: string) => {
    return `${AKTIVITETSPLAN_URL}/aktivitet/vis/${aktivitetId}`;
};

export const visAktivitetsplan = (aktivitetID: string, fnrContext?: string) => (event: MouseEvent) => {
    if (!fnrContext) {
        return;
    }
    event.preventDefault();
    window.history.replaceState({}, 'aktivitetsplan', `${getContextPath()}/${fnrContext}/aktivitet/vis/${aktivitetID}`);
    window.dispatchEvent(new CustomEvent('visAktivitetsplan', { detail: aktivitetID }));
};
