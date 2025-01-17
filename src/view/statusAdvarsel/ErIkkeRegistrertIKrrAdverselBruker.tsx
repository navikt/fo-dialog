import React from 'react';
import ErIkkeRegistrertIKrrAdverselBruker from './ErIkkeRegistrertIKrrAdversel';
import ErIkkeRegistrertIKrrAdverselVeileder from './ErIkkeRegistrertIKrrAdverselVeileder';

interface Props {
    erVeileder: boolean;
}

export default function ErIkkeRegistrertIKrrAdversel(props: Props) {
    return props.erVeileder ? <ErIkkeRegistrertIKrrAdverselVeileder /> : <ErIkkeRegistrertIKrrAdverselBruker />;
}
