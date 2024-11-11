import { Tag } from '@navikt/ds-react';
import React from 'react';

interface Props {
    hidden?: boolean;
}

function AvtaltMarkering(props: Props) {
    const { hidden } = props;

    if (hidden) return null;
    return (
        <Tag className="mr-2" variant="alt3-filled" size="small">
            Avtalt med Nav
        </Tag>
    );
}

export default AvtaltMarkering;
