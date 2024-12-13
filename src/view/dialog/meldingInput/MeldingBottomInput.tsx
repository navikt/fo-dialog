import { Alert, Button, ErrorMessage, Textarea } from '@navikt/ds-react';
import React, { MutableRefObject, useContext, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { betterErrorMessage, MeldingInputContext, useFocusBeforeHilsen } from './inputUtils';
import { MeldingFormValues } from './MeldingInputBox';
import { PaperplaneIcon } from '@navikt/aksel-icons';
import { Breakpoint, useBreakpoint } from '../../utils/useBreakpoint';
import { dataOrUndefined } from '../../Provider';
import { useOppfolgingContext } from '../../OppfolgingProvider';
import KladdLagret from './KladdLagret';
import { useSelectedDialog } from '../../utils/useAktivitetId';

const MeldingBottomInputInner = () => {
    const { onSubmit, noeFeilet } = useContext(MeldingInputContext);
    const {
        register,
        getValues,
        formState: { errors, isSubmitting }
    } = useFormContext<MeldingFormValues>();
    const breakpoint = useBreakpoint();
    const textAreaRef: MutableRefObject<HTMLTextAreaElement | null> = useRef(null);
    useFocusBeforeHilsen(textAreaRef);

    const formHooks = register('melding');
    return (
        <form className="'flex flex-1 flex-col overflow-hidden'" onSubmit={onSubmit} noValidate autoComplete="off">
            <div className="flex items-end">
                <label htmlFor="melding_input" className="sr-only">
                    Skriv om arbeid og oppfølging
                </label>
                <Textarea
                    id="melding_input"
                    className="w-full"
                    {...formHooks}
                    ref={(ref) => {
                        textAreaRef.current = ref;
                        formHooks.ref(ref);
                    }}
                    placeholder={'Skriv om arbeid og oppfølging'}
                    minRows={3}
                    maxRows={12}
                    maxLength={5000}
                    label="Skriv om arbeid og oppfølging"
                    hideLabel
                />
                <div className="flex flex-col space-y-2 pb-6">
                    <KladdLagret />
                    <Button
                        size="small"
                        className="self-center mx-2"
                        title="Send"
                        icon={breakpoint === Breakpoint.initial ? <PaperplaneIcon /> : undefined}
                        loading={isSubmitting}
                    >
                        {breakpoint !== Breakpoint.initial ? 'Send' : ''}
                    </Button>
                </div>
            </div>
            {errors.melding ? (
                <ErrorMessage className="mt-2" size="small">
                    {betterErrorMessage(errors.melding, getValues('melding')).message}
                </ErrorMessage>
            ) : null}
            {noeFeilet ? (
                <Alert className="mt-4" variant="error">
                    Noe gikk dessverre galt med systemet. Prøv igjen senere.
                </Alert>
            ) : null}
        </form>
    );
};

export const MeldingBottomInput = () => {
    const oppfolgingContext = useOppfolgingContext();
    const oppfolging = dataOrUndefined(oppfolgingContext);
    const dialog = useSelectedDialog();
    if (!dialog) {
        console.log('Invisble');
        return null;
    }
    return (
        <section
            aria-label="Ny melding"
            className="flex justify-center border-t border-border-divider p-4 overflow-y-scroll"
        >
            <div className="grow justify-self-center ">
                {!oppfolging?.underOppfolging || dialog.historisk ? null : <MeldingBottomInputInner />}
            </div>
        </section>
    );
};
