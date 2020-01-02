import React, { useContext } from 'react';

import { DialogData } from '../../utils/Typer';
import { UserInfoContext } from '../Provider';
import { VenterSvarFraBruker, VenterSvarFraNAV, ViktigMelding } from './etiketer/Etikett';

interface Props {
    dialog: DialogData;
}

export function EtikettListe(props: Props) {
    const userInfo = useContext(UserInfoContext);

    const dialogErViktig = props.dialog.egenskaper.length > 0;
    const venterPaSvar = props.dialog.venterPaSvar;
    const visVenterPaaNav = !!userInfo && !props.dialog.ferdigBehandlet && userInfo.erVeileder;

    return (
        <>
            <VenterSvarFraBruker visible={venterPaSvar} />
            <ViktigMelding visible={dialogErViktig} />
            <VenterSvarFraNAV visible={visVenterPaaNav} />
        </>
    );
}
