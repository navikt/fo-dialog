import React from 'react';
import { Aktivitet, DialogData } from '../utils/typer';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';

import useFetch from '../utils/use-fetch';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { ReactComponent as AktivitetsIkon } from './aktivitet_lest.svg';
import { formaterDate } from '../utils/date';

interface Props {
    dialog: DialogData;
}

export function AktivitetskortPreview(props: Props) {
const aktiviteter = useFetch<Aktivitet[]>('/veilarbaktivitet/api/aktivitet');
if (aktiviteter.data !== null) {
    const aktivitet = aktiviteter.data.find(aktivitet => aktivitet.id === props.dialog.aktivitetId);
    const datoString = !!props.dialog.sisteDato ? formaterDate(props.dialog.sisteDato) : '';

    if (aktivitet) {
        return (
            <LenkepanelBase href={'fisk'} className="aktivitetskortpreview">
                <AktivitetsIkon className="aktivitetskortpreview__ikon" />
                <div>
                    <Undertittel children={aktivitet.tittel} />
                    <Undertekst>
                        {datoString} | {aktivitet.arbeidsgiver}
                    </Undertekst>
                </div>
            </LenkepanelBase>
        );
    }
}
return null;
}
