import React, { useContext } from 'react';

import { DialogData } from '../../utils/typer';
import { EtikettFokus, EtikettAdvarsel } from '../../felleskomponenter/Etiketter';
import { UserInfoContext } from '../Provider';

interface Props {
    dialog: DialogData;
}

export function EtikettListe(props: Props) {
    const userInfo = useContext(UserInfoContext);

    const dialogErViktig = props.dialog.egenskaper.length > 0;

    return (
        <>
            <EtikettFokus
                className="dialog-preview__etikett dialog-preview__etikett--nav-venter"
                children="NAV venter på svar fra deg"
                visible={props.dialog.venterPaSvar}
            />

            <EtikettAdvarsel className="dialog-preview__etikett" children="Viktig melding" visible={dialogErViktig} />

            {!!userInfo ? (
                <EtikettFokus
                    className="dialog-preview__etikett dialog-preview__etikett--bruker-venter"
                    children="Venter på svar fra NAV"
                    visible={!props.dialog.ferdigBehandlet && userInfo.erVeileder}
                />
            ) : null}
        </>
    );
}
