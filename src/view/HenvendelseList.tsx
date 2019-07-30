import { HenvendelseData } from '../utils/typer';
import React from 'react';
import { Henvendelse } from './Henvendelse';
import { hasData } from '@nutgaard/use-fetch';

import './henvendelseList.less';
import { useDialogContext } from '../Context';
import LestAvTidspunktVisible from './LestTidspunkt';

interface Props {
    henvendelseDataList: HenvendelseData[];
}

export function HenvendelseList(props: Props) {
    const dialoger = useDialogContext();
    if (!props.henvendelseDataList) {
        return null;
    }
    const dialogId = props.henvendelseDataList[0].dialogId;
    const dialogData = hasData(dialoger) ? dialoger.data : [];
    const valgtDialog = dialogData.find(dialog => dialog.id === dialogId);
    const lestAvBrukerTidspunkt = valgtDialog ? valgtDialog.lestAvBrukerTidspunkt : null;

    const henvendelserSynkende =
        props.henvendelseDataList &&
        props.henvendelseDataList.sort((a: HenvendelseData, b: HenvendelseData) => datoComparator(a.sendt, b.sendt));

    const sisteHenvendelseLestAvBruker =
        lestAvBrukerTidspunkt &&
        henvendelserSynkende.find(henvendelse => datoComparator(lestAvBrukerTidspunkt, henvendelse.sendt) >= 0);

    const henvendelser = props.henvendelseDataList.map(henvendelse => (
        <div key={henvendelse.id} className="henvendelse-list__henvendelse">
            <LestAvTidspunktVisible
                tidspunkt={lestAvBrukerTidspunkt!}
                visible={henvendelse.id === sisteHenvendelseLestAvBruker.id}
            />
            <Henvendelse henvendelseData={henvendelse} />
        </div>
    ));

    return (
        <div className="henvendelse-list">
            <div className="henvendelse-list__viewport">{henvendelser}</div>
        </div>
    );
}

function datoComparator(adato: string, bdato: string): number {
    return adato > bdato ? -1 : adato === bdato ? 0 : 1;
}
