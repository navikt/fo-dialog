import { Heading, Link } from '@navikt/ds-react';
import classNames from 'classnames';
import React from 'react';
import { useLocation, useMatches, useParams } from 'react-router';

import { AKTIVITETSPLAN_URL, MINSIDE_URL } from '../../constants';
import useKansendeMelding from '../../utils/UseKanSendeMelding';
import { useUserInfoContext } from '../BrukerProvider';
import { useDialogContext } from '../DialogProvider';
import InfoVedIngenDialoger from '../info/InfoVedIngenDialoger';
import OmDialogLenke from '../info/OmDialogLenke';
import { useSelectedDialog } from '../utils/useAktivitetId';
import DialogListe from './DialogListe';
import DialogOverviewHeader from './NyDialogLink';

const DialogOversiktHeader = ({ erVeileder }: { erVeileder: boolean }) => {
    return (
        <div className="p-4 flex flex-col gap-y-2 border-b border-border-divider">
            <div className="flex md:justify-between gap-x-4">
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
    const matches = useMatches();
    const isNyRoute = matches.some((match) => match.pathname.startsWith('/ny'));
    const userInfoContext = useUserInfoContext();
    const erVeileder = !!userInfoContext?.erVeileder;
    return (
        <div
            className={classNames(
                { hidden: !!dialog || isNyRoute } /* Hvis liten skjerm, bare vis dialog-liste på "Homepage"  */,
                'border-r border-border-divider w-full h-full md:max-w-[20rem] md:flex md:flex-col'
            )}
        >
            <DialogOversiktHeader erVeileder={erVeileder} />
            <div className="px-2 pb-8 bg-gray-100 pt-4 overflow-y-scroll h-full border-r border-border-divider">
                <DialogOverviewHeader visible={kanSendeMelding} />
                <InfoVedIngenDialoger className="md:hidden mt-4" visible={dialoger.length === 0} />
                <DialogListe />
            </div>
        </div>
    );
};

export default DialogOversikt;
