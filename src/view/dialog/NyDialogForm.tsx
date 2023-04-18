import { BodyShort, Button } from '@navikt/ds-react';
import useFormstate, { SubmitHandler } from '@nutgaard/use-formstate';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';

import AlertStripeFeilVisible from '../../felleskomponenter/AlertStripeFeilVisible';
import loggEvent from '../../felleskomponenter/logging';
import { StringOrNull } from '../../utils/Typer';
import { UpdateTypes, dispatchUpdate } from '../../utils/UpdateEvent';
import { useUserInfoContext } from '../BrukerProvider';
import { useDialogContext } from '../DialogProvider';
import { findKladd, useKladdContext } from '../KladdProvider';
import { cutStringAtLength } from '../utils/stringUtils';
import style from './NyDialogForm.module.less';
import { SkrivMeldingInput } from './SkrivMeldingInput';
import { TemaInput } from './TemaInput';
import { TittelHeader } from './TittelHeader';
import useHenvendelseStartTekst from './UseHenvendelseStartTekst';

const maxMeldingsLengde = 5000;
const veilederInfoMelding = 'Skriv en melding til brukeren';
const brukerinfomelding =
    'Her kan du skrive til din veileder om arbeid og oppfølging. Du vil få svar i løpet av noen dager.';

const validerTema = (tema: string, rest: any, props: { disabled?: boolean }) => {
    if (props.disabled) {
        return undefined;
    }

    if (tema.trim().length === 0) {
        return 'Du må skrive hva meldingen handler om';
    }
    if (tema.trim().length > 100) {
        return 'Tema kan ikke være mer enn 100 tegn';
    }
};

const validerMelding = (melding: string, resten: any, props: { startTekst?: string }) => {
    if (melding.length > maxMeldingsLengde) {
        return `Meldingen kan ikke være mer enn ${maxMeldingsLengde} tegn`;
    }
    if (melding.trim().length === 0) {
        return 'Du må fylle ut en melding';
    }
    if (melding.trim() === props.startTekst?.trim()) {
        return 'Du må endre på meldingen';
    }
};

export type NyDialogInputProps = { tema: string; melding: string };
export type Handler = SubmitHandler<NyDialogInputProps>;

interface Props {
    defaultTema: string;
    onSubmit: () => void;
    aktivitetId?: string;
}

const NyDialogForm = (props: Props) => {
    const { defaultTema, onSubmit, aktivitetId } = props;
    const { hentDialoger, nyDialog } = useDialogContext();
    const bruker = useUserInfoContext();
    const history = useHistory();
    const [noeFeilet, setNoeFeilet] = useState(false);
    const startTekst = useHenvendelseStartTekst();

    const { kladder, oppdaterKladd, slettKladd } = useKladdContext();
    const kladd = findKladd(kladder, null, aktivitetId);

    const [gjeldendeInput, setGjeldendeInput] = useState<{ tema?: StringOrNull; melding?: StringOrNull }>({
        tema: kladd?.overskrift,
        melding: kladd?.tekst
    });
    const timer = useRef<number | undefined>();
    const callback = useRef<() => any>();

    const validator = useFormstate<NyDialogInputProps>({
        tema: validerTema,
        melding: validerMelding
    });

    const state = validator({
        tema: kladd?.overskrift ?? cutStringAtLength(defaultTema, 100, '...'),
        melding: !!kladd?.tekst ? kladd.tekst : startTekst
    });

    useEffect(() => {
        return () => {
            timer.current && clearInterval(timer.current);
            timer.current && callback.current && callback.current();
        };
    }, []);

    const erVeileder = !!bruker && bruker.erVeileder;
    const infoTekst = erVeileder ? veilederInfoMelding : brukerinfomelding;

    const handleSubmit: Handler = (data) => {
        const { tema, melding } = data;

        timer.current && clearInterval(timer.current);
        timer.current = undefined;

        loggEvent('arbeidsrettet-dialog.ny.dialog', { paaAktivitet: !!aktivitetId });
        return nyDialog(melding, tema, aktivitetId)
            .then((dialog) => {
                slettKladd(null, props.aktivitetId);
                onSubmit();
                history.push('/' + dialog.id);
                dispatchUpdate(UpdateTypes.Dialog);
                return dialog;
            })
            .then(hentDialoger)
            .catch(() => setNoeFeilet(true));
    };

    const onChange = (tema?: string, melding?: string) => {
        const newTema = tema !== undefined ? tema : gjeldendeInput.tema;
        const newMelding = melding !== undefined ? melding : gjeldendeInput.melding;
        setGjeldendeInput({ tema: newTema, melding: newMelding });
        timer.current && clearInterval(timer.current);
        callback.current = () => {
            timer.current = undefined;
            oppdaterKladd(null, props.aktivitetId, newTema, newMelding);
        };
        timer.current = window.setTimeout(callback.current, 500);
    };

    return (
        <div className={style.nyDialog}>
            <form className={style.nyDialogForm} onSubmit={state.onSubmit(handleSubmit)} autoComplete="off">
                <legend>
                    <TittelHeader>Ny dialog</TittelHeader>
                </legend>
                <div className={style.skjemaInnhold}>
                    <BodyShort className={style.infotekst}>{infoTekst}</BodyShort>
                    <TemaInput onChange={onChange} state={state} aktivitetId={aktivitetId} />
                    <SkrivMeldingInput maxMeldingsLengde={maxMeldingsLengde} state={state} onChange={onChange} />
                </div>

                <Button loading={state.submitting}>Send</Button>

                <AlertStripeFeilVisible variant="error" visible={noeFeilet}>
                    Noe gikk dessverre galt med systemet. Prøv igjen senere.
                </AlertStripeFeilVisible>
            </form>
        </div>
    );
};

export default NyDialogForm;
