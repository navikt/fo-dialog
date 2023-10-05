import classNames from 'classnames';
import TextareaAutosize from '@navikt/ds-react/esm/util/TextareaAutoSize';
import { Alert, Button, ErrorMessage } from '@navikt/ds-react';
import React, { useContext } from 'react';
import { useCompactMode } from '../../../featureToggle/FeatureToggleProvider';
import { useFormContext } from 'react-hook-form';
import { betterErrorMessage, MeldingInputContext } from './inputUtils';
import { MeldingFormValues } from './MeldingInputBox';
import { PaperplaneIcon } from '@navikt/aksel-icons';
import { Breakpoint, useBreakpoint } from '../../utils/useBreakpoint';
import ManagedDialogCheckboxes from '../DialogCheckboxes';
import { dataOrUndefined } from '../../Provider';
import { useOppfolgingContext } from '../../OppfolgingProvider';
import { DialogData } from '../../../utils/Typer';

const MeldingBottomInputInner = () => {
    const { onSubmit, noeFeilet } = useContext(MeldingInputContext);
    const {
        register,
        getValues,
        formState: { errors, isSubmitting }
    } = useFormContext<MeldingFormValues>();
    const compactMode = useCompactMode();
    const breakpoint = useBreakpoint();

    return (
        <form className="'flex flex-1 flex-col overflow-hidden'" onSubmit={onSubmit} noValidate autoComplete="off">
            <div className="flex">
                <label htmlFor="melding_input" className="hidden ">
                    Skriv om arbeid og oppfølging
                </label>
                <TextareaAutosize
                    id="melding_input"
                    className={classNames(
                        'w-full grow border-2 border-gray-500 focus:border-blue-500 rounded-md p-2 overflow-auto outline-0',
                        { 'border-red-300': errors.melding }
                    )}
                    style={{ overflow: 'auto' }}
                    {...register('melding')}
                    placeholder={'Skriv om arbeid og oppfølging'}
                    minRows={3}
                    maxRows={12}
                />
                <Button
                    size={compactMode ? 'small' : 'medium'}
                    className="self-end ml-2"
                    title="Send"
                    icon={breakpoint === Breakpoint.initial ? <PaperplaneIcon /> : undefined}
                    loading={isSubmitting}
                >
                    {breakpoint !== Breakpoint.initial ? 'Send' : ''}
                </Button>
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

export const MeldingBottomInput = ({ dialog }: { dialog: DialogData }) => {
    const oppfolgingContext = useOppfolgingContext();
    const oppfolging = dataOrUndefined(oppfolgingContext);
    const compactMode = useCompactMode();
    return (
        <section aria-label="Ny melding" className="flex justify-center border-t border-border-divider p-4">
            <div
                className={classNames('grow justify-self-center', {
                    'xl:max-w-248': !compactMode
                })}
            >
                <ManagedDialogCheckboxes />
                {!oppfolging?.underOppfolging || dialog.historisk ? null : <MeldingBottomInputInner />}
            </div>
        </section>
    );
};
