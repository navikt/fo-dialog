import React, { useEffect, useState } from 'react';
import { DemoIkon } from './DemoIkon';
import Modal from 'nav-frontend-modal';
import DemoDashboard from './DemoDashboard';
import ReactDOM from 'react-dom';
import { harHodeFotSkruddPa } from './sessionstorage';

function Hode() {
    return <div className="hodefot hode-mock"></div>;
}

function Fot() {
    return <div className="hodefot fot-mock"></div>;
}

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
        const main = document.createElement('div');
        const fot = document.createElement('div');

        main.id = 'maincontent';
        main.appendChild(document.getElementById('root')!);

        pageWrapper.appendChild(hode);
        pageWrapper.appendChild(main);
        document.body.appendChild(pageWrapper);
        document.body.appendChild(fot);
        ReactDOM.render(<Hode />, hode);
        ReactDOM.render(<Fot />, fot);
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
            <Modal isOpen={open} contentLabel={''} onRequestClose={() => setOpen(false)} closeButton={true}>
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
