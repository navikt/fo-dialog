import React from 'react';

import { VenterSvarFraBruker, VenterSvarFraNAV, ViktigMelding } from '../../felleskomponenter/etiketer/Etikett';
import { DialogData, OppfolgingData } from '../../utils/Typer';
import { useOppfolgingContext } from '../OppfolgingProvider';
import { dataOrUndefined, useErVeileder } from '../Provider';

interface Props {
    dialog: DialogData;
}

function erViktig(dialog: DialogData, oppfolging?: OppfolgingData): boolean {
    if (dialog.egenskaper.length > 0) {
        if (dialog.egenskaper[0] === 'ESKALERINGSVARSEL') {
            return oppfolging?.gjeldendeEskaleringsvarsel?.tilhorendeDialogId.toString() === dialog.id;
        }

        return true;
    }

    return false;
}

export function EtikettListe({ dialog }: Props) {
    const { historisk, ferdigBehandlet, venterPaSvar } = dialog;
    const erVeileder = useErVeileder();
    const oppfolging = useOppfolgingContext();

    if (historisk) {
        return null;
    }

    const dialogErViktig = erViktig(dialog, dataOrUndefined(oppfolging));
    const visVenterPaaNav = !ferdigBehandlet && erVeileder;

    return (
        <>
            <VenterSvarFraBruker visible={venterPaSvar} erVeileder={erVeileder} />
            <ViktigMelding visible={dialogErViktig} />
            <VenterSvarFraNAV visible={visVenterPaaNav} />
        </>
    );
}
