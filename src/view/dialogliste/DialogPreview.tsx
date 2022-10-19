import classNames from 'classnames';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Normaltekst, Systemtittel, Undertekst } from 'nav-frontend-typografi';
import React, { useEffect, useRef, useState } from 'react';
import { Flipped, Flipper } from 'react-flip-toolkit';

import WrapInReactLink from '../../felleskomponenter/WrapInReactLink';
import { Aktivitet, ArenaAktivitet } from '../../utils/aktivitetTypes';
import { formaterDate } from '../../utils/Date';
import { DialogData, StringOrNull } from '../../utils/Typer';
import { getDialogTittel } from '../aktivitet/TextUtils';
import { findAktivitet, useAktivitetContext } from '../AktivitetProvider';
import styles from './DialogPreview.module.less';
import { EtikettListe } from './EtikettListe';
import Ikon from './ikon/Ikon';

interface TittelProps {
    aktivitet?: Aktivitet | ArenaAktivitet;
    tittel: StringOrNull;
}

const ALIGN_TO_BOTTOM: ScrollIntoViewOptions = { block: 'end', inline: 'nearest' };

function Tittel(props: TittelProps) {
    const tittel = props.aktivitet ? getDialogTittel(props.aktivitet) : props.tittel;
    return (
        <Systemtittel tag="p" className={styles.heading}>
            {tittel}
        </Systemtittel>
    );
}

function typeText(dialog: DialogData) {
    if (dialog.aktivitetId) {
        return dialog.lest ? 'Dialog om aktivitet' : 'Ulest dialog om aktivitet';
    }
    return dialog.lest ? 'Dialog' : 'Ulest dialog';
}

function meldingerText(length: number) {
    if (length <= 1) {
        return `${length} melding i dialogen`;
    }
    return `${length} meldinger i dialogen`;
}

interface Props {
    dialog: DialogData;
    valgtDialogId?: string;
}

function DialogPreview(props: Props) {
    const dialogref = useRef<HTMLDivElement | null>(null);
    const [firstTime, setFirstTime] = useState<boolean>(true);

    const { dialog, valgtDialogId } = props;
    const { id, sisteDato, aktivitetId, lest, overskrift, historisk } = dialog;
    const detteErValgtDialog = id === valgtDialogId;
    if (detteErValgtDialog) console.log('DialogPreview valgtdialog: ', valgtDialogId, ', id: ', id);
    useEffect(() => {
        console.log(
            'DialogPreview - useEffect dialogref, detteErValgtDialog, firstTime, focused: ',
            dialogref,
            detteErValgtDialog,
            firstTime,
            document.activeElement
        );
        console.log('DialogPreview - dialogref.current ', dialogref?.current);
        console.log('DialogPreview - dialogref.current.parentElement ', dialogref?.current?.parentElement);

        const dialogElement: HTMLElement | null | undefined = dialogref?.current?.parentElement;
        if (firstTime && dialogElement && detteErValgtDialog) {
            dialogElement.scrollIntoView(ALIGN_TO_BOTTOM);
            setFirstTime(false);
        }
    }, [dialogref, detteErValgtDialog, firstTime]);

    const aktivitetData = useAktivitetContext();

    const datoString = !!sisteDato ? formaterDate(sisteDato) : '';
    const aktivitet = findAktivitet(aktivitetData, aktivitetId);

    const erLest = lest || historisk;

    const lenkepanelCls = classNames(styles.preview, {
        [styles.innholdUlest]: !erLest,
        [styles.innholdValgt]: detteErValgtDialog
    });
    const markoer = erLest ? styles.markoerLest : styles.markoerUlest;

    return (
        <LenkepanelBase className={lenkepanelCls} href={`/${id}`} linkCreator={WrapInReactLink}>
            <div className={markoer} />
            <Ikon dialog={dialog} />
            <div className={styles.content}>
                <Normaltekst className="visually-hidden">{typeText(dialog)}</Normaltekst>
                <Tittel tittel={overskrift} aktivitet={aktivitet} />
                <Undertekst className={styles.dato}>{datoString}</Undertekst>
                <EtikettListe dialog={dialog} />
                <Normaltekst className="visually-hidden">{meldingerText(dialog.henvendelser.length)}</Normaltekst>
            </div>
            <Normaltekst aria-hidden="true">{dialog.henvendelser.length}</Normaltekst>
            <div ref={dialogref}></div>
        </LenkepanelBase>
    );
}

interface ListeProps {
    dialoger: DialogData[];
    valgDialog?: string;
}

export function DialogPreviewListe(props: ListeProps) {
    const { dialoger, valgDialog } = props;

    if (dialoger.length === 0) return null;
    return (
        <Flipper flipKey={dialoger.map((d) => d.id).join('')}>
            <div role="list" aria-label="Dialogliste">
                {dialoger.map((dialog) => (
                    <Flipped flipId={dialog.id} key={dialog.id}>
                        <div role="listitem">
                            <DialogPreview dialog={dialog} key={dialog.id} valgtDialogId={valgDialog} />
                        </div>
                    </Flipped>
                ))}
            </div>
        </Flipper>
    );
}

export default DialogPreview;
