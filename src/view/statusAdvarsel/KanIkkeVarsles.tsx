import React from 'react';

import { KanIkkeKontakteElektroniskVeileder } from './StatusAdvarselWrapper';
import BrukerKanIkkeVarsles from './BrukerKanIkkeVarsles';

interface Props {
    erVeileder: boolean;
}

export default function KanIkkeVarsles(props: Props) {
    return props.erVeileder ? <KanIkkeKontakteElektroniskVeileder /> : <BrukerKanIkkeVarsles />;
}
