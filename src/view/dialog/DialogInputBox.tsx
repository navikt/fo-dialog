import React, { useState } from 'react';
import { DialogData } from '../../utils/Typer';
import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import { dataOrUndefined, useOppfolgingContext, useUserInfoContext, useViewContext } from '../Provider';
import DialogCheckboxesVisible from './DialogCheckboxes';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import useFormstate, { Formstate } from '@nutgaard/use-formstate';
import Textarea from '../../felleskomponenter/input/textarea';
import { Hovedknapp } from 'nav-frontend-knapper';
import { HandlingsType, sendtNyHenvendelse } from '../ViewState';
import { dispatchUpdate, UpdateTypes } from '../../utils/UpdateEvent';
import { isDialogPendingOrReloading, useDialogContext } from '../DialogProvider';
import useHenvendelseStartTekst from './UseHenvendelseStartTekst';
import loggEvent from '../../felleskomponenter/logging';

const AlertStripeFeilVisible = visibleIfHoc(AlertStripeFeil);

const maxMeldingsLengde = 5000;

interface Props {
    dialog: DialogData;
    kanSendeHenveldelse: boolean;
}

function validerMelding(melding: string, resten: any, props: { startTekst?: string }) {
    if (melding.length > maxMeldingsLengde) {
        return `Meldingen kan ikke være mer enn ${maxMeldingsLengde} tegn.`;
    }
    if (melding.trim().length === 0) {
        return 'Du må fylle ut en melding.';
    }
    if (melding.trim() === props.startTekst?.trim()) {
        return 'Du må endre på meldingen';
    }
}

const validator = useFormstate({
    melding: validerMelding
});

interface HenvendelseInputProps {
    autoFocus: false | boolean;
    state: Formstate<{ [p: string]: any }>;
    laster: boolean;
    kanSendeHenvendelse: boolean;
}

function HenvendelseInput(props: HenvendelseInputProps) {
    const { autoFocus, state, laster, kanSendeHenvendelse } = props;

    if (!kanSendeHenvendelse) {
        return null;
    }

    return (
        <div className="skriv-melding label-sr-only">
            <Textarea
                label="Skriv en melding om arbeid og oppfølging"
                placeholder="Skriv en melding om arbeid og oppfølging"
                textareaClass="autosizing-textarea"
                maxLength={maxMeldingsLengde}
                visTellerFra={1000}
                autoFocus={autoFocus}
                submittoken={state.submittoken}
                {...state.fields.melding}
            />
            <Hovedknapp title="Send" autoDisableVedSpinner spinner={laster}>
                Send
            </Hovedknapp>
        </div>
    );
}

export function DialogInputBox(props: Props) {
    const bruker = useUserInfoContext();
    const oppfolgingContext = useOppfolgingContext();
    const oppfolging = dataOrUndefined(oppfolgingContext);
    const { hentDialoger, nyHenvendelse, setFerdigBehandlet, setVenterPaSvar, status } = useDialogContext();
    const dialogLaster = isDialogPendingOrReloading(status);
    const [noeFeilet, setNoeFeilet] = useState(false);
    const startTekst = useHenvendelseStartTekst();

    const { viewState, setViewState } = useViewContext();

    const valgtDialog = props.dialog;
    const kanSendeHenveldelse = props.kanSendeHenveldelse;

    const initalValues = {
        melding: startTekst
    };

    const state = validator(initalValues, { startTekst });

    if (!oppfolging?.underOppfolging || valgtDialog.historisk) {
        return null;
    }

    const onSubmit = (data: { melding: string }) => {
        const { melding } = data;
        loggEvent('arbeidsrettet-dialog.ny.henvendelse', { paaAktivitet: !!valgtDialog.aktivitetId });
        return nyHenvendelse(melding, valgtDialog)
            .then(dialog => {
                if (bruker?.erVeileder) {
                    if (!dialog.ferdigBehandlet) {
                        return setFerdigBehandlet(valgtDialog, true);
                    }
                }
                return dialog;
            })
            .then(hentDialoger)
            .then(() => {
                setNoeFeilet(false);
                state.reinitialize(initalValues);
                setViewState(sendtNyHenvendelse(viewState));
                dispatchUpdate(UpdateTypes.Dialog);
            })
            .catch(() => setNoeFeilet(true));
    };

    const laster = state.submitting || dialogLaster;
    const match = window.matchMedia ? window.matchMedia(`(min-width: 768px)`).matches : false;
    const autoFocus = match && viewState.sistHandlingsType !== HandlingsType.nyDialog;

    return (
        <section aria-label="Ny melding">
            <form onSubmit={state.onSubmit(onSubmit)} noValidate autoComplete="off">
                <HenvendelseInput
                    laster={laster}
                    state={state}
                    autoFocus={autoFocus}
                    kanSendeHenvendelse={kanSendeHenveldelse}
                />
                <DialogCheckboxesVisible
                    toggleFerdigBehandlet={ferdigBehandlet => setFerdigBehandlet(valgtDialog, ferdigBehandlet)}
                    toggleVenterPaSvar={venterPaSvar => setVenterPaSvar(valgtDialog, venterPaSvar)}
                    ferdigBehandlet={valgtDialog.ferdigBehandlet}
                    venterPaSvar={valgtDialog.venterPaSvar}
                    visible={bruker!.erVeileder}
                    disabled={laster}
                />
                <AlertStripeFeilVisible visible={noeFeilet}>
                    Det skjedde en alvorlig feil. Prøv igjen senere
                </AlertStripeFeilVisible>
            </form>
        </section>
    );
}

export default DialogInputBox;
