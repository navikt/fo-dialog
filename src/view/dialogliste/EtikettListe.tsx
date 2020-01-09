import React, { useContext } from 'react';

import { DialogData } from '../../utils/Typer';
import { UserInfoContext } from '../Provider';
import { VenterSvarFraBruker, VenterSvarFraNAV, ViktigMelding } from './etiketer/Etikett';

interface Props {
    dialog: DialogData;
}

export function EtikettListe(props: Props) {
    const userInfo = useContext(UserInfoContext);
    const erVeileder = !!userInfo && userInfo.erVeileder;

    const dialogErViktig = props.dialog.egenskaper.length > 0;
    const venterPaSvar = props.dialog.venterPaSvar;
    const visVenterPaaNav = !!userInfo && !props.dialog.ferdigBehandlet && erVeileder;

    return (
        <>
            <VenterSvarFraBruker visible={venterPaSvar} erVeileder={erVeileder} />
            <ViktigMelding visible={dialogErViktig} />
            <VenterSvarFraNAV visible={visVenterPaaNav} />
        </>
    );
}
