import Lenke from 'nav-frontend-lenker';
import React from 'react';

import { ReactComponent as EksternLenkeIkon } from './ekstern-lenke.svg';

const httpRegex = /^(https?):\/\/.*$/;

interface PropTypes {
    lenke: string | null;
}

const EksternLenke = (props: PropTypes) => {
    const { lenke } = props;

    const trimmetLenke = lenke?.trim();

    if (!trimmetLenke) {
        return null;
    }

    const paddaLenke = trimmetLenke.match(httpRegex) ? trimmetLenke : `http://${trimmetLenke}`;

    return (
        <Lenke href={paddaLenke}>
            {lenke}
            <EksternLenkeIkon />
        </Lenke>
    );
};

export default EksternLenke;
