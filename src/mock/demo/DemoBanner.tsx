import { Modal, ToggleGroup } from '@navikt/ds-react';
import React, { useState } from 'react';

import DemoDashboard from './DemoDashboard';
import { DemoIkon } from './DemoIkon';

function DemoBanner() {
    const [open, setOpen] = useState(false);
    const [skult, setSkult] = useState(false);

    const mode = (localStorage.getItem('compactMode') as 'vanlig' | 'compact' | undefined) || 'vanlig';

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
            <div className="fixed bottom-10 right-10 bg-white drop-shadow-lg" style={{ zIndex: 1000 }}>
                <ToggleGroup
                    defaultValue={mode}
                    onChange={(event) => {
                        localStorage.setItem('compactMode', event);
                        window.dispatchEvent(new Event('storage'));
                    }}
                >
                    <ToggleGroup.Item value="vanlig">Vanlig</ToggleGroup.Item>
                    <ToggleGroup.Item value="compact">Compact</ToggleGroup.Item>
                </ToggleGroup>
            </div>
        </div>
    );
}

export default DemoBanner;
