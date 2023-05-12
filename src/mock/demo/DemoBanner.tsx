import { Modal } from '@navikt/ds-react';
import React, { useState } from 'react';

import DemoDashboard from './DemoDashboard';
import { DemoIkon } from './DemoIkon';

function DemoBanner() {
    const [open, setOpen] = useState(false);
    const [skult, setSkult] = useState(false);

    if (skult) {
        return null;
    }

    return (
        <div>
            <DemoIkon onClick={() => setOpen(true)} />
            <Modal open={open} onClose={() => setOpen(false)} closeButton={true}>
                <DemoDashboard
                    skul={() => {
                        setSkult(true);
                        setOpen(false);
                    }}
                />
            </Modal>
        </div>
    );
}

export default DemoBanner;
