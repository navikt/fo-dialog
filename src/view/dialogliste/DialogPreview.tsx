import React from 'react';
import { DialogData, StringOrNull } from '../../utils/Typer';
import { EtikettLiten, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { EtikettListe } from './EtikettListe';
import { formaterDate } from '../../utils/Date';
import WrapInReactLink from '../../felleskomponenter/WrapInReactLink';
import classNames from 'classnames';
import styles from './DialogPreview.module.less';
import Ikon from './ikon/Ikon';
import { getDialogTittel } from '../aktivitet/TextUtils';
import { Aktivitet, ArenaAktivitet } from '../../utils/AktivitetTypes';
import { findAktivitet, useAktivitetContext } from '../AktivitetProvider';

interface TittelProps {
    aktivitet?: Aktivitet | ArenaAktivitet;
    tittel: StringOrNull;
}

function Tittel(props: TittelProps) {
    const tittel = props.aktivitet ? getDialogTittel(props.aktivitet) : props.tittel;
    return <Systemtittel className={styles.heading}>{tittel}</Systemtittel>;
}

interface Props {
    dialog: DialogData;
    valgtDialogId?: string;
}

function DialogPreview(props: Props) {
    const { dialog, valgtDialogId } = props;
    const { id, sisteDato, aktivitetId, lest, overskrift } = dialog;
    const aktivitetData = useAktivitetContext();

    const datoString = !!sisteDato ? formaterDate(sisteDato) : '';
    const aktivitet = findAktivitet(aktivitetData, aktivitetId);
    const lenkepanelCls = classNames(styles.preview, {
        [styles.innholdUlest]: !lest,
        [styles.innholdValgt]: id === valgtDialogId
    });
    const markoer = lest ? styles.markoerLest : styles.markoerUlest;

    return (
        <LenkepanelBase className={lenkepanelCls} href={`/${id}`} linkCreator={WrapInReactLink}>
            <div className={markoer}>&nbsp;</div>
            <Ikon dialog={dialog} />
            <div className={styles.content}>
                <Tittel tittel={overskrift} aktivitet={aktivitet} />
                <EtikettLiten className={styles.dato}>{datoString}</EtikettLiten>
                <EtikettListe dialog={dialog} />
            </div>
            <Normaltekst>{dialog.henvendelser.length}</Normaltekst>
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
