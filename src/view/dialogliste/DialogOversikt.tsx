import classNames from 'classnames';
import { VenstreChevron } from 'nav-frontend-chevron';
import Lenke from 'nav-frontend-lenker';
import { Systemtittel } from 'nav-frontend-typografi';
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
            <Lenke href={minsideUrl} className={styles.dintnav}>
                <VenstreChevron />
                Min side
            </Lenke>
            <Systemtittel tag="h1" className={styles.tittel}>
                Dialog med veilederen din
            </Systemtittel>
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
