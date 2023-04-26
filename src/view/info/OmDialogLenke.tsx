import { Link, Modal } from '@navikt/ds-react';
import React, { useState } from 'react';

import { InfoOmDialogSide } from './InfoOmDialogSide';

function OmDialogLenke() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Link as="button" onClick={() => setOpen(true)}>
                Om dialog
            </Link>
            <Modal open={open} onClose={() => setOpen(!open)} closeButton={true}>
                <InfoOmDialogSide />
            </Modal>
        </>
    );
}

export default OmDialogLenke;
