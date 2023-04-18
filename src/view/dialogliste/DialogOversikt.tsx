import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { Heading, Link } from '@navikt/ds-react';
import classNames from 'classnames';
import React from 'react';
import { useParams } from 'react-router';

import { minsideUrl } from '../../metrics/constants';
import useKansendeMelding from '../../utils/UseKanSendeMelding';
import { useUserInfoContext } from '../BrukerProvider';
import { useDialogContext } from '../DialogProvider';
import InfoVedIngenDialoger from '../info/InfoVedIngenDialoger';
import OmDialogLenke from '../info/OmDialogLenke';
import DialogListe from './DialogListe';
import styles from './DialogOversikt.module.less';
import DialogOverviewHeader from './NyDialogLink';

interface HeaderProps {
    erVeileder: boolean;
}
const DialogOversiktHeader = (props: HeaderProps) => {
    if (props.erVeileder) {
        return null;
    }

    return (
        <>
            <Link href={minsideUrl} className={styles.dintnav}>
                <ChevronLeftIcon />
                Min side
            </Link>
            <Heading level={'1'} className={styles.tittel}>
                Dialog med veilederen din
            </Heading>
        </>
    );
};

const DialogOversikt = () => {
    const kanSendeMelding = useKansendeMelding();
    const { dialoger } = useDialogContext();
    const { dialogId } = useParams();
    const userInfoContext = useUserInfoContext();
    const erVeileder = !!userInfoContext?.erVeileder;

    const visningCls = dialogId ? classNames(styles.dialogOversikt, styles.dialogValgt) : styles.dialogOversikt;

    return (
        <div className={visningCls}>
            <div className={styles.header}>
                <DialogOversiktHeader erVeileder={erVeileder} />
                <div className={styles.verktoylinje}>
                    <DialogOverviewHeader visible={kanSendeMelding} />
                    <OmDialogLenke />
                </div>
            </div>
            <InfoVedIngenDialoger className={styles.info} visible={dialoger.length === 0} />
            <DialogListe />
        </div>
    );
};

export default DialogOversikt;
