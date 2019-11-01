import React from 'react';
import Lenke from 'nav-frontend-lenker';
import EksternLenkeIkon from './EksternLenkeIkon';

const httpRegex = /^(https?):\/\/.*$/;

interface PropTypes {
    lenke: string | null;
}

export default function EksternLenke(props: PropTypes) {
    const { lenke } = props;

    if (!lenke) return null;
    const paddaLenke = lenke && lenke.match(httpRegex) ? lenke : `http://${lenke}`;
    return (
        <Lenke href={paddaLenke}>
            {lenke}
            <EksternLenkeIkon />
        </Lenke>
    );
}
