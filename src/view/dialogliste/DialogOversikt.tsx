import { Heading, Link } from '@navikt/ds-react';
import classNames from 'classnames';
import React from 'react';
import { useLocation } from 'react-router';

import { AKTIVITETSPLAN_URL, MINSIDE_URL } from '../../constants';
import useKansendeMelding from '../../utils/UseKanSendeMelding';
import { useUserInfoContext } from '../BrukerProvider';
import { useDialogContext } from '../DialogProvider';
import { useCompactMode } from '../FeatureToggleProvider';
import InfoVedIngenDialoger from '../info/InfoVedIngenDialoger';
import OmDialogLenke from '../info/OmDialogLenke';
import { useSelectedDialog } from '../utils/useAktivitetId';
import DialogListe from './DialogListe';
import NyDialogLink from './NyDialogLink';

const DialogOversiktHeader = ({ erVeileder }: { erVeileder: boolean }) => {
    const compactMode = useCompactMode();
    if (compactMode && erVeileder) return null;
    return (
        <div
            className={classNames('flex flex-col gap-y-2 border-b border-border-divider  px-4', {
                'py-4': !compactMode,
                'py-1': compactMode
            })}
        >
            <div
                className={classNames('flex gap-x-4 ', {
                    'md:justify-between': !compactMode
                })}
            >
                {!erVeileder ? (
                    <>
                        <Link href={MINSIDE_URL}>Min side</Link>
                        <Link href={AKTIVITETSPLAN_URL}>Aktivitetsplan</Link>
                    </>
                ) : null}
                {!compactMode && <OmDialogLenke />}
            </div>
            {!erVeileder ? (
                <Heading level="1" size="medium">
                    Dialog med veilederen din
                </Heading>
            ) : null}
        </div>
    );
};

const DialogOversikt = () => {
    const kanSendeMelding = useKansendeMelding();
    const { dialoger } = useDialogContext();
    const dialog = useSelectedDialog();
    const location = useLocation();
    const isNyRoute = location.pathname.startsWith('/ny');
    const userInfoContext = useUserInfoContext();
    const erVeileder = !!userInfoContext?.erVeileder;
    const ingenDialoger = dialoger.length === 0;
    const compactMode = useCompactMode();

    return (
        <div
            className={classNames(
                { hidden: !!dialog || isNyRoute } /* Hvis liten skjerm, bare vis dialog-liste på "Homepage"  */,
                'flex h-full w-full flex-col border-r border-border-divider md:flex md:max-w-xs md:flex-col xl:w-[16.7vw] xl:min-w-[320px] xl:max-w-none'
            )}
        >
            <DialogOversiktHeader erVeileder={erVeileder} />
            <div
                className={classNames(
                    'flex h-full flex-col overflow-y-scroll border-r border-border-divider bg-gray-100 px-2 pb-8',
                    {
                        'pt-4': !compactMode,
                        'pt-2': compactMode
                    }
                )}
            >
                {!compactMode ? (
                    <>
                        <div className="p-2">{kanSendeMelding ? <NyDialogLink /> : null}</div>
                        {ingenDialoger ? <InfoVedIngenDialoger className="mt-4 md:hidden" /> : null}
                    </>
                ) : (
                    <>
                        {kanSendeMelding ? (
                            <div className="flex gap-2 p-1 pb-2">
                                <NyDialogLink />
                                <OmDialogLenke />
                            </div>
                        ) : null}
                        {ingenDialoger ? <InfoVedIngenDialoger className="mt-4 md:hidden" /> : null}
                    </>
                )}
                <DialogListe />
            </div>
        </div>
    );
};

export default DialogOversikt;
