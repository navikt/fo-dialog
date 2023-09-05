import { Heading, Link } from '@navikt/ds-react';
import classNames from 'classnames';
import React from 'react';
import { useLocation } from 'react-router';

import { AKTIVITETSPLAN_URL, MINSIDE_URL } from '../../constants';
import useKansendeMelding from '../../utils/UseKanSendeMelding';
import { useUserInfoContext } from '../BrukerProvider';
import { useDialogContext } from '../DialogProvider';
import InfoVedIngenDialoger from '../info/InfoVedIngenDialoger';
import OmDialogLenke from '../info/OmDialogLenke';
import { useSelectedDialog } from '../utils/useAktivitetId';
import DialogListe from './DialogListe';
import NyDialogLink from './NyDialogLink';

const DialogOversiktHeader = ({ erVeileder }: { erVeileder: boolean }) => {
    return (
        <div className="flex flex-col gap-y-2 border-b border-border-divider p-4">
            <div className="flex gap-x-4 md:justify-between">
                {!erVeileder ? (
                    <>
                        <Link href={MINSIDE_URL}>Min side</Link>
                        <Link href={AKTIVITETSPLAN_URL}>Aktivitetsplan</Link>
                    </>
                ) : null}
                <OmDialogLenke />
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
    const erSidebar = !!dialog || isNyRoute;
    return (
        <div
            className={classNames(
                /* Hvis liten skjerm, bare vis dialog-liste på "Homepage", ikke som sideBar  */
                { 'hidden md:flex': erSidebar },
                { flex: !erSidebar },
                'w-full flex-col border-r border-border-divider ' +
                    'md:max-w-xs ' +
                    'xl:w-[16.7vw] xl:min-w-[320px] xl:max-w-none'
            )}
        >
            <DialogOversiktHeader erVeileder={erVeileder} />
            <div className="relative flex flex-1 flex-col overflow-y-scroll border-r border-border-divider bg-gray-100 px-2 pb-2 pt-4">
                <div className="p-2">{kanSendeMelding ? <NyDialogLink /> : null}</div>
                {ingenDialoger ? <InfoVedIngenDialoger className="mt-4 md:hidden" /> : null}
                <DialogListe />
            </div>
        </div>
    );
};

export default DialogOversikt;
