import React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import { CheckboksPanelGruppe, RadioPanelGruppe } from 'nav-frontend-skjema';
import {
    BRUKER_TYPE,
    brukerKanIkkeVarsles,
    erEksternBruker,
    erKRRBruker,
    erManuellBruker,
    erPrivatBruker,
    harIngenDialoger,
    ingenOppfPerioder,
    SessionStorageElement,
    settSessionStorage
} from './sessionstorage';
import './DemoDashboard.less';
import { Hovedknapp } from 'nav-frontend-knapper';

function reload() {
    window.location.reload();
}

function endreBrukerType(value: string) {
    settSessionStorage(SessionStorageElement.BRUKER_TYPE, value);
    reload();
}

function getBrukerType() {
    return erEksternBruker() ? BRUKER_TYPE.EKSTERN : BRUKER_TYPE.INTERN;
}

function endreTilstand(event: React.SyntheticEvent<EventTarget>) {
    const checkbox = (event as React.ChangeEvent<HTMLInputElement>).currentTarget;
    settSessionStorage(checkbox.id, checkbox.checked);
    reload();
}

interface DemoDashboardProps {
    skul: () => void;
}

function DemoDashboard(props: DemoDashboardProps) {
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
                    },
                    {
                        label: 'Bruker kan ikke varsles',
                        id: SessionStorageElement.KAN_IKKE_VARSLES,
                        checked: brukerKanIkkeVarsles()
                    },
                    {
                        label: 'Ingen dialoger',
                        id: SessionStorageElement.INGEN_DIALOGER,
                        checked: harIngenDialoger()
                    }
                ]}
                onChange={endreTilstand}
            />
            <div>
                <Hovedknapp onClick={props.skul}>Skul demo banner</Hovedknapp>
            </div>
        </section>
    );
}

export default DemoDashboard;
