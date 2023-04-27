import { Heading, Link } from '@navikt/ds-react';
import classNames from 'classnames';
import React from 'react';
import { useParams } from 'react-router';

import { AKTIVITETSPLAN_URL, MINSIDE_URL } from '../../constants';
import useKansendeMelding from '../../utils/UseKanSendeMelding';
import { useUserInfoContext } from '../BrukerProvider';
import { useDialogContext } from '../DialogProvider';
import InfoVedIngenDialoger from '../info/InfoVedIngenDialoger';
import OmDialogLenke from '../info/OmDialogLenke';
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
    const { dialogId } = useParams();
    const userInfoContext = useUserInfoContext();
    const erVeileder = !!userInfoContext?.erVeileder;
    return (
        <div
            className={classNames(
                { 'hidden md:flex flex-col': !!dialogId },
                'border-r border-border-divider w-full h-full md:max-w-[20rem]'
            )}
        >
            <DialogOversiktHeader erVeileder={erVeileder} />
            <div className="px-4 bg-gray-100 pt-4 overflow-y-scroll">
                <DialogOverviewHeader visible={kanSendeMelding} />
                <InfoVedIngenDialoger className="block" visible={dialoger.length === 0} />
                <DialogListe />
            </div>
        </div>
    );
};

export default DialogOversikt;
