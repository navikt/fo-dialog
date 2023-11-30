import classNames from 'classnames';
// import TextareaAutosize from '@navikt/ds-react/esm/util/TextareaAutoSize';
import { Alert, Button, ErrorMessage, Textarea } from '@navikt/ds-react';
import React, { MutableRefObject, useContext, useRef } from 'react';
import { useCompactMode } from '../../../featureToggle/FeatureToggleProvider';
import { useFormContext } from 'react-hook-form';
import { betterErrorMessage, MeldingInputContext, useFocusBeforeHilsen } from './inputUtils';
import { MeldingFormValues } from './MeldingInputBox';
import ManagedDialogCheckboxes from '../DialogCheckboxes';
import { dataOrUndefined } from '../../Provider';
import { useOppfolgingContext } from '../../OppfolgingProvider';
import { DialogData } from '../../../utils/Typer';
import KladdLagret from './KladdLagret';

const MeldingSideInputInner = () => {
    const { onSubmit, noeFeilet } = useContext(MeldingInputContext);
    const {
        register,
        getValues,
        formState: { errors, isSubmitting }
    } = useFormContext<MeldingFormValues>();
    const compactMode = useCompactMode();
    const textAreaRef: MutableRefObject<HTMLTextAreaElement | null> = useRef(null);
    useFocusBeforeHilsen(textAreaRef);

    const formHooks = register('melding');
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
                    {...formHooks}
                    ref={(ref) => {
                        textAreaRef.current = ref;
                        formHooks.ref(ref);
                    }}
                    placeholder={'Skriv om arbeid og oppfølging'}
                    minRows={3}
                    maxRows={100} // Will overflow before hitting max lines
                />
                <div className="self-stretch mt-2 flex justify-between">
                    <Button size={compactMode ? 'small' : 'medium'} title="Send" loading={isSubmitting}>
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

export const MeldingSideInput = ({ dialog }: { dialog: DialogData }) => {
    const oppfolgingContext = useOppfolgingContext();
    const oppfolging = dataOrUndefined(oppfolgingContext);
    return (
        <section aria-label="Ny melding" className="flex flex-1 bg-white p-4">
            <div className="w-full flex flex-col">
                <ManagedDialogCheckboxes />
                {!oppfolging?.underOppfolging || dialog.historisk ? null : <MeldingSideInputInner />}
            </div>
        </section>
    );
};
