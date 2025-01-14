import { Alert, Button, Textarea } from '@navikt/ds-react';
import React, { MutableRefObject, useContext, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { betterErrorMessage, MeldingInputContext, useFocusBeforeHilsen } from './inputUtils';
import { MeldingFormValues } from './MeldingInputBox';
import ManagedDialogCheckboxes from '../DialogCheckboxes';
import { dataOrUndefined } from '../../Provider';
import { useOppfolgingContext } from '../../OppfolgingProvider';
import KladdLagret from './KladdLagret';
import { useSelectedDialog } from '../../utils/useAktivitetId';

const MeldingSideInputInner = () => {
    const { onSubmit, noeFeilet } = useContext(MeldingInputContext);
    const {
        register,
        getValues,
        watch,
        formState: { errors, isSubmitting }
    } = useFormContext<MeldingFormValues>();

    const melding = watch('melding');
    const startTekst = watch('startTekst');

    const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        let startPos = melding.length - (startTekst || '').length;
        event.target.setSelectionRange(startPos, startPos);
    };

    return (
        <form className="flex flex-1 flex-col overflow-hidden" onSubmit={onSubmit} noValidate autoComplete="off">
            <div className={'overflow-hidden  flex flex-col'}>
                <Textarea
                    label="Skriv om arbeid og oppfølging"
                    hideLabel
                    id="melding_input"
                    error={
                        errors.melding ? (
                            <div>{betterErrorMessage(errors.melding, getValues('melding')).message}</div>
                        ) : null
                    }
                    className="overflow-auto"
                    {...register('melding')}
                    placeholder={'Skriv om arbeid og oppfølging'}
                    minRows={3}
                    maxRows={100} // Will overflow before hitting max lines
                    maxLength={5000}
                    onFocus={handleFocus}
                />
                <div className="self-stretch mt-2 flex justify-between items-end">
                    <Button size="small" title="Send" disabled={isSubmitting} loading={isSubmitting}>
                        Send
                    </Button>
                    <KladdLagret />
                </div>
            </div>

            {noeFeilet ? (
                <Alert className="mt-4" variant="error">
                    Noe gikk dessverre galt med systemet. Prøv igjen senere.
                </Alert>
            ) : null}
        </form>
    );
};

export const MeldingSideInput = () => {
    const oppfolgingContext = useOppfolgingContext();
    const oppfolging = dataOrUndefined(oppfolgingContext);
    const dialog = useSelectedDialog();
    if (!dialog) return null;
    return (
        <section aria-label="Ny melding" className="flex flex-1 bg-white p-4">
            <div className="w-full flex flex-col">
                <ManagedDialogCheckboxes dialog={dialog} />
                {!oppfolging?.underOppfolging || dialog.historisk ? null : <MeldingSideInputInner />}
            </div>
        </section>
    );
};
