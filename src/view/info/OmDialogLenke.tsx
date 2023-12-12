import { Button, Modal } from '@navikt/ds-react';
import React, { useState } from 'react';

import { InfoOmDialogSide } from './InfoOmDialogSide';

function OmDialogLenke() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button variant="tertiary" size="small" className="flex-grow" as="button" onClick={() => setOpen(true)}>
                Om dialogen
            </Button>
            <Modal
                closeOnBackdropClick={true}
                open={open}
                onClose={() => setOpen(!open)}
                header={{ heading: 'Om dialogen', closeButton: true }}
            >
                <InfoOmDialogSide />
            </Modal>
        </>
    );
}

export default OmDialogLenke;
