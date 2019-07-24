import React from 'react';
import { hasData } from '@nutgaard/use-fetch';
import { DialogPreview } from './DialogPreview';
import { DialogData } from '../utils/typer';
import { DialogOverviewHeaderVisible } from './DialogOverviewHeader';
import { useDialogContext, useOppfolgingContext } from '../Context';

import './dialogoverview.less';

export function DialogOverview() {
    const oppfolgingData = useOppfolgingContext();
    const dialoger = useDialogContext();
    const dialogData = hasData(dialoger) ? dialoger.data : [];

    const erUnderOppfolging = oppfolgingData!.underOppfolging;
    const harOppfolgingsPerioder = oppfolgingData!.oppfolgingsPerioder.length > 0;

    if (!erUnderOppfolging && !harOppfolgingsPerioder) {
        return null;
    } else {
        const sortedOppfolgingsData = dialogData.sort((a, b) => sortDialoger(a, b));
        return (
            <div className="dialog-overview">
                <DialogOverviewHeaderVisible dialogData={dialogData} visible={oppfolgingData!.underOppfolging} />
                <div className="dialog-overview__preview-list">
                    {sortedOppfolgingsData.map(dialog => (
                        <DialogPreview dialog={dialog} key={dialog.id} />
                    ))}
                </div>
            </div>
        );
    }
}

function sortDialoger(a: DialogData, b: DialogData): number {
    var adato = a.sisteDato === null ? '' : '' + a.sisteDato;
    var bdato = b.sisteDato === null ? '' : '' + b.sisteDato;
    return adato > bdato ? -1 : adato === bdato ? 0 : 1;
}
