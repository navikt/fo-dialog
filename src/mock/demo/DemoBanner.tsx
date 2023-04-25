import { Modal } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';

import DemoDashboard from './DemoDashboard';
import { DemoIkon } from './DemoIkon';
import { harHodeFotSkruddPa } from './localstorage';

function DemoBanner() {
    const [open, setOpen] = useState(false);
    const [skult, setSkult] = useState(false);

    const hodeFot = harHodeFotSkruddPa();

    useEffect(() => {
        if (!hodeFot) {
            return;
        }

        const pageWrapper = document.createElement('div');
        pageWrapper.id = 'pagewrapper';

        const hode = document.createElement('div');
        hode.className = 'hodefot hode-mock';
        const main = document.createElement('div');
        const fot = document.createElement('div');
        fot.className = 'hodefot fot-mock';

        main.id = 'maincontent';
        main.appendChild(document.getElementById('root')!);

        pageWrapper.appendChild(hode);
        pageWrapper.appendChild(main);
        document.body.appendChild(pageWrapper);
        document.body.appendChild(fot);
        return () => {
            document.body.appendChild(document.getElementById('root')!);
            document.body.removeChild(pageWrapper);
            document.body.removeChild(fot);
        };
    }, [hodeFot]);

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
