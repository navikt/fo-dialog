import React from 'react';

import { KanIkkeKontakteElektroniskVeileder } from './StatusAdvarselWrapper';
import TekniskFeilBrukerstotte from './TekniskFeilBrukerstotte';

interface Props {
    erVeileder: boolean;
}

export default function KanIkkeVarsles(props: Props) {
    return props.erVeileder ? <KanIkkeKontakteElektroniskVeileder /> : <TekniskFeilBrukerstotte />;
}
