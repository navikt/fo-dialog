import React from 'react';
import { DialogData } from '../utils/typer';
import { DialogPreview } from './DialogPreview';
import { DialogOverviewHeaderVisible } from './DialogOverviewHeader';
import { useOppfolgingContext } from '../Context';

import './dialogoverview.less';

interface Props {
    dialogData: DialogData[];
}

export function DialogOverview(props: Props) {
    const oppfolgingData = useOppfolgingContext();

    const erUnderOppfolging = oppfolgingData!.underOppfolging;
    const harOppfolgingsPerioder = oppfolgingData!.oppfolgingsPerioder.length > 0;

    if (!erUnderOppfolging && !harOppfolgingsPerioder) {
        return null;
    } else {
        const sortedOppfolgingsData = props.dialogData.sort((a, b) => sortDialoger(a, b));
        return (
            <div className="dialog-overview">
                <DialogOverviewHeaderVisible dialogData={props.dialogData} visible={oppfolgingData!.underOppfolging} />
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
