import { Link } from '@navikt/ds-react';
import React, { MouseEvent } from 'react';

import { aktivtetsplanUrl } from '../../constants';
import { useFnrContext } from '../Provider';
import { getContextPath } from '../utils/utils';

export const aktivitetLenke = (aktivitetId: string) => {
    return `${aktivtetsplanUrl}/aktivitet/vis/${aktivitetId}`;
};

export const visAktivitetsplan = (aktivitetID: string, fnrContext?: string) => (event: MouseEvent) => {
    if (!fnrContext) {
        return;
    }
    event.preventDefault();
    window.history.replaceState({}, 'aktivitetsplan', `${getContextPath()}/${fnrContext}/aktivitet/vis/${aktivitetID}`);
    window.dispatchEvent(new CustomEvent('visAktivitetsplan', { detail: aktivitetID }));
};

interface Props {
    aktivitetId: string;
}

export default function AktivitetskortLenke(props: Props) {
    const fnr = useFnrContext();
    const aktivitetId = props.aktivitetId;
    return (
        <Link className="mb-8" href={aktivitetLenke(aktivitetId)} onClick={visAktivitetsplan(aktivitetId, fnr)}>
            Gå til aktiviteten
        </Link>
    );
}
