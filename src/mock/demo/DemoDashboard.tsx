import React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import { CheckboksPanelGruppe, RadioPanelGruppe } from 'nav-frontend-skjema';
import {
    SessionStorageElement,
    settSessionStorage,
    erPrivatBruker,
    erManuellBruker,
    erKRRBruker,
    ingenOppfPerioder,
    hentFraSessionStorage,
    BRUKER_TYPE
} from './sessionstorage';
import './DemoDashboard.less';

function reload() {
    window.location.reload();
}

function endreBrukerType(value: string) {
    settSessionStorage(SessionStorageElement.BRUKER_TYPE, value);
    reload();
}

function getBrukerType() {
    return hentFraSessionStorage(SessionStorageElement.BRUKER_TYPE) || BRUKER_TYPE.EKSTERN;
}

function endreTilstand(event: React.SyntheticEvent<EventTarget>) {
    const checkbox = (event as React.ChangeEvent<HTMLInputElement>).currentTarget;
    settSessionStorage(checkbox.id, checkbox.checked);
    reload();
}

function DemoDashboard() {
    return (
        <section className="demodashboard">
            <Innholdstittel className="blokk-s">DEMO</Innholdstittel>
            <RadioPanelGruppe
                legend="Brukertype"
                name="brukertype-radio-panel"
                radios={[
                    {
                        label: 'Veileder',
                        value: BRUKER_TYPE.INTERN
                    },
                    {
                        label: 'Eksternbruker',
                        value: BRUKER_TYPE.EKSTERN
                    }
                ]}
                checked={getBrukerType()}
                onChange={(e, value) => endreBrukerType(value)}
            />
            <CheckboksPanelGruppe
                legend="Brukers tilstand"
                checkboxes={[
                    {
                        label: 'Ikke under oppfølging',
                        id: SessionStorageElement.PRIVAT_BRUKER,
                        checked: erPrivatBruker()
                    },
                    {
                        label: 'Manuell',
                        id: SessionStorageElement.MANUELL_BRUKER,
                        checked: erManuellBruker()
                    },
                    {
                        label: 'KRR',
                        id: SessionStorageElement.KRR_BRUKER,
                        checked: erKRRBruker()
                    },
                    {
                        label: 'Ingen oppfølgingsperioder',
                        id: SessionStorageElement.INGEN_OPPF_PERIODER,
                        checked: ingenOppfPerioder()
                    }
                ]}
                onChange={endreTilstand}
            />
        </section>
    );
}

export default DemoDashboard;
