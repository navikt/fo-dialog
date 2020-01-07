import React from 'react';
import { DialogData } from '../../utils/Typer';
import { EtikettLiten, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { EtikettListe } from './EtikettListe';
import { formaterDate } from '../../utils/Date';
import WrapInReactLink from '../../felleskomponenter/WrapInReactLink';
import classNames from 'classnames';
import styles from './DialogPreview.module.less';
import Ikon from './ikon/Ikon';

import { useFetchAktivitetMedFnrContext } from '../../api/UseAktivitet';

interface Props {
    dialog: DialogData;
    valgtDialogId?: string;
}

function DialogPreview(props: Props) {
    const { dialog, valgtDialogId } = props;
    const { id, sisteDato, aktivitetId, lest, overskrift, sisteTekst } = dialog;
    const findAktivitet = useFetchAktivitetMedFnrContext();

    const datoString = !!sisteDato ? formaterDate(sisteDato) : '';
    const aktivitet = findAktivitet(aktivitetId);
    const lenkepanelCls = classNames(styles.preview, {
        [styles.lest]: lest,
        [styles.valgt]: id === valgtDialogId
    });

    return (
        <LenkepanelBase className={lenkepanelCls} href={`/${id}`} linkCreator={WrapInReactLink}>
            <Ikon dialog={dialog} />
            <div className={styles.content}>
                <Systemtittel className={styles.heading}>{aktivitet ? aktivitet.tittel : overskrift}</Systemtittel>
                <Normaltekst className={styles.sisteMelding}>{sisteTekst}</Normaltekst>
                <EtikettLiten className={styles.dato}>{datoString}</EtikettLiten>
                <EtikettListe dialog={dialog} />
            </div>
        </LenkepanelBase>
    );
}

interface ListeProps {
    dialoger: DialogData[];
    valgDialog?: string;
}

export function DialogPreviewListe(props: ListeProps) {
    const { dialoger, valgDialog } = props;
    return (
        <>
            {dialoger.map(dialog => (
                <DialogPreview dialog={dialog} key={dialog.id} valgtDialogId={valgDialog} />
            ))}
        </>
    );
}

export default DialogPreview;
