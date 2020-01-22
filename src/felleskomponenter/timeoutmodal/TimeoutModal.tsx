import React, { useEffect, useState } from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import Veilederpanel from 'nav-frontend-veilederpanel';
import HovedKnapp from 'nav-frontend-knapper/lib/hovedknapp';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { hiddenIfHoc } from '../HiddenIfHoc';
import { ReactComponent as ObsSVG } from './obs.svg';
import './Timeoutmodal.less';

export const getCookie = (name: string) => {
    const re = new RegExp(`${name}=([^;]+)`);
    const match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
};

function getHeaders() {
    return new Headers({
        credentials: 'same-origin',
        'Content-Type': 'application/json',
        NAV_CSRF_PROTECTION: getCookie('NAV_CSRF_PROTECTION')
    });
}

function utloptTidspunktMinusFemMinutter(remainingSeconds: number): number {
    return (remainingSeconds - 300) * 1000;
}

interface Props {
    authUrl?: string;
    visDemo?: boolean;
}

function TimeoutModal(props: Props) {
    const { authUrl, visDemo } = props;
    const [skalVises, setSkalVises] = useState(false);

    useEffect(() => {
        fetch(authUrl || '/api/auth', {
            headers: getHeaders()
        })
            .then(response => {
                return response.json();
            })
            .then(authExp => {
                const { remainingSeconds } = authExp;

                if (remainingSeconds) {
                    const expirationInMillis = utloptTidspunktMinusFemMinutter(remainingSeconds);
                    const expiresAt = new Date().getTime() + expirationInMillis;

                    setTimeout(() => {
                        setSkalVises(true);
                    }, expirationInMillis);

                    document.addEventListener('mousedown', () => {
                        const hasExpired = new Date().getTime() >= expiresAt;
                        setSkalVises(hasExpired);
                    });
                }
            })
            .catch(e => {
                console.log('catch', e);
            });
    }, [authUrl]);

    const apen = skalVises || !!visDemo;
    return (
        <NavFrontendModal
            isOpen={apen}
            className="timeoutbox-modal"
            contentLabel="Blir logget ut"
            shouldCloseOnOverlayClick={false}
            closeButton={false}
            onRequestClose={() => false}
        >
            <Veilederpanel svg={<ObsSVG />} type="plakat" kompakt={true}>
                <div className="timeoutbox-nedtelling">
                    <Systemtittel className="timeoutbox-modal__tittel">Sesjonen din har utløpt</Systemtittel>
                    <Normaltekst className="timeoutbox-modal__beskrivelse">
                        Du må starte på nytt for å fortsette.
                    </Normaltekst>
                    <HovedKnapp
                        className="timeoutbox-modal__knapp"
                        onClick={() => {
                            window.location.reload();
                        }}
                    >
                        Start på nytt
                    </HovedKnapp>
                </div>
            </Veilederpanel>
        </NavFrontendModal>
    );
}

export default hiddenIfHoc(TimeoutModal);
