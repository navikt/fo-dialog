import { Button, Link, Modal } from '@navikt/ds-react';
import React, { useState } from 'react';

import { useCompactMode } from '../../featureToggle/FeatureToggleProvider';
import { InfoOmDialogSide } from './InfoOmDialogSide';

function OmDialogLenke() {
    const [open, setOpen] = useState(false);

    const compactMode = useCompactMode();
    return (
        <>
            {compactMode ? (
                <Button variant="tertiary" size="small" className="flex-grow" as="button" onClick={() => setOpen(true)}>
                    Om dialogen
                </Button>
            ) : (
                <Link as="button" onClick={() => setOpen(true)}>
                    Om dialog
                </Link>
            )}
            <Modal open={open} onClose={() => setOpen(!open)} header={{ heading: 'Om dialogen', closeButton: true }}>
                <InfoOmDialogSide />
            </Modal>
        </>
    );
}

export default OmDialogLenke;
