import React, { useState } from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import { CheckboksPanelGruppe, RadioPanelGruppe, SkjemaGruppe } from 'nav-frontend-skjema';
import {
    BRUKER_TYPE,
    brukerKanIkkeVarsles,
    erEksternBruker,
    erKRRBruker,
    erManuellBruker,
    erPrivatBruker,
    getFailureRate,
    harHodeFotSkruddPa,
    harIngenDialoger,
    ingenOppfPerioder,
    SessionStorageElement,
    settSessionStorage
} from './sessionstorage';
import { Hovedknapp } from 'nav-frontend-knapper';
import styles from './DemoDashboard.module.less';

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

function endreFeilureRate(value: number) {
    settSessionStorage(SessionStorageElement.FAILURE_RATE, value);
    reload();
}

interface DemoDashboardProps {
    skul: () => void;
}

function DemoDashboard(props: DemoDashboardProps) {
    const [failureRange, setFailureRange] = useState(getFailureRate());
    return (
        <section className={styles.demodashboard}>
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

            <CheckboksPanelGruppe
                legend="Teknisk"
                checkboxes={[
                    {
                        label: 'HodeFot mock',
                        id: SessionStorageElement.HODEFOT,
                        checked: harHodeFotSkruddPa()
                    }
                ]}
                onChange={endreTilstand}
            />
            <SkjemaGruppe className={styles.tekniskKolonne}>
                <Hovedknapp onClick={props.skul}>Skul demo banner</Hovedknapp>

                <div className={styles.range}>
                    <label className="" htmlFor="myRange">
                        Failure rate {failureRange}:{' '}
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={failureRange}
                        id="myRange"
                        onChange={(ev) => setFailureRange(Number.parseInt(ev.target.value))}
                        onBlur={() => endreFeilureRate(failureRange)}
                    />
                </div>
            </SkjemaGruppe>
        </section>
    );
}

export default DemoDashboard;
