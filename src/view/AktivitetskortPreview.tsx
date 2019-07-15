import React from 'react';
import { DialogData } from '../utils/typer';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { HoyreChevron } from 'nav-frontend-chevron';
import Lenke from 'nav-frontend-lenker';

interface Props {
    dialog: DialogData | null;
}

export function AktivitetskortPreview(props: Props) {
    if (props.dialog) {
        return (
            <div className="aktivitetskortpreview">
                <Lenke href="/dialog">
                    <Undertittel>
                        Aktivitet: {props.dialog.aktivitetId}
                        <HoyreChevron />
                    </Undertittel>
                </Lenke>
                <Normaltekst>Frist: 24.12. Arbeidsgiver: Julenissen</Normaltekst>
            </div>
        );
    }
    return null
}