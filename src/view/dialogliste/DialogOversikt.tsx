import React from 'react';
import DialogOverviewHeader from './NyDialogLink';
import { useParams } from 'react-router';
import classNames from 'classnames';
import styles from './DialogOversikt.module.less';
import useKansendeMelding from '../../utils/UseKanSendeMelding';
import DialogListe from './DialogListe';
import OmDialogLenke from '../info/OmDialogLenke';
import InfoVedIngenDialoger from '../info/InfoVedIngenDialoger';
import { useDialogContext } from '../DialogProvider';
import Lenke from 'nav-frontend-lenker';
import { VenstreChevron } from 'nav-frontend-chevron';
import { Systemtittel } from 'nav-frontend-typografi';
import { useUserInfoContext } from '../Provider';

function DitNavLenke(props: { erVeileder: boolean }) {
    if (props.erVeileder) {
        return null;
    }
    return (
        <Lenke href="/arbeid/dialog/dittnav" className={styles.dintnav}>
            <VenstreChevron />
            Ditt NAV
        </Lenke>
    );
}

export function DialogOversikt() {
    const kanSendeMelding = useKansendeMelding();
    const { dialoger } = useDialogContext();
    const { dialogId } = useParams();
    const userInfoContext = useUserInfoContext();
    const erVeileder = !!userInfoContext?.erVeileder;

    const visningCls = dialogId ? classNames(styles.dialogOversikt, styles.dialogValgt) : styles.dialogOversikt;

    return (
        <div className={visningCls}>
            <div className={styles.header}>
                <DitNavLenke erVeileder={erVeileder} />
                <Systemtittel tag="h1" className={styles.tittel}>
                    Dialog med veilederen din
                </Systemtittel>

                <div className={styles.verktoylinje}>
                    <DialogOverviewHeader visible={kanSendeMelding} />
                    <OmDialogLenke />
                </div>
            </div>
            <InfoVedIngenDialoger className={styles.info} visible={dialoger.length === 0} />
            <DialogListe />
        </div>
    );
}

export default DialogOversikt;
