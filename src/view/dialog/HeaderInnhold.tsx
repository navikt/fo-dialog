import React from 'react';

import { StringOrNull } from '../../utils/Typer';
import { AktivitetskortPreview } from '../aktivitet/AktivitetskortPreview';
import { dialogHeaderID1 } from './DialogHeader';
import { DialogOverskrift } from './DialogOverskrift';

interface PropsTypes {
    viseAktivitet: boolean;
    dialogOverskrift?: StringOrNull;
    aktivitetId?: StringOrNull;
}

export const HeaderInnhold = (props: PropsTypes) => {
    const { viseAktivitet, dialogOverskrift, aktivitetId } = props;

    const UUMarkering = () => (
        <div id={dialogHeaderID1} className="hidden">
            Dialog om:
        </div>
    );

    return (
        <>
            <UUMarkering />
            {viseAktivitet ? (
                <AktivitetskortPreview aktivitetId={aktivitetId} />
            ) : (
                <DialogOverskrift tekst={dialogOverskrift} />
            )}
        </>
    );
};
