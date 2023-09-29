import classNames from 'classnames';
import TextareaAutosize from '@navikt/ds-react/esm/util/TextareaAutoSize';
import { Alert, Button, ErrorMessage } from '@navikt/ds-react';
import React, { ChangeEvent } from 'react';
import { useCompactMode } from '../../../featureToggle/FeatureToggleProvider';
import { useFormContext } from 'react-hook-form';
import { betterErrorMessage } from './inputUtils';
import { MeldingFormValues } from './MeldingInputBox';
interface Props {
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    noeFeilet: boolean;
}
export const MeldingSideInput = ({ onSubmit, onChange, noeFeilet }: Props) => {
    const {
        register,
        getValues,
        formState: { errors, isSubmitting }
    } = useFormContext<MeldingFormValues>();
    const compactMode = useCompactMode();

    return (
        <form className="flex flex-1 flex-col overflow-hidden" onSubmit={onSubmit} noValidate autoComplete="off">
            <div className={'overflow-hidden p-1 flex flex-col'}>
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
                    onChange={(event) => {
                        onChange(event);
                        register('melding').onChange(event);
                    }}
                    placeholder={'Skriv om arbeid og oppfølging'}
                    minRows={3}
                    maxRows={100} // Will overflow before hitting max lines
                />
                <Button
                    size={compactMode ? 'small' : 'medium'}
                    className={'self-start mt-2'}
                    title="Send"
                    loading={isSubmitting}
                >
                    Send
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
