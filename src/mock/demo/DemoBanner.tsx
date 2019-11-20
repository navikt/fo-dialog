import React, { useState } from 'react';
import { DemoIkon } from './DemoIkon';
import Modal from 'nav-frontend-modal';
import DemoDashboard from './DemoDashboard';

function DemoBanner() {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <DemoIkon onClick={() => setOpen(true)} />
            <Modal isOpen={open} contentLabel={''} onRequestClose={() => setOpen(false)} closeButton={true}>
                <DemoDashboard />
            </Modal>
        </div>
    );
}

export default DemoBanner;
