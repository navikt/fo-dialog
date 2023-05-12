import { BodyShort, GuidePanel } from '@navikt/ds-react';
import React from 'react';

import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';

interface Props {
    className?: string;
}

const InfoVedIngenDialoger = ({ className }: Props) => {
    return (
        <div className={className}>
            <GuidePanel>
                <BodyShort className="block pb-2">
                    Her kan du sende meldinger til veilederen din om arbeid og oppfølging.
                </BodyShort>
                <BodyShort className="block pb-2">Du får svar i løpet av noen dager.</BodyShort>
            </GuidePanel>
        </div>
    );
};

export default visibleIfHoc(InfoVedIngenDialoger);
