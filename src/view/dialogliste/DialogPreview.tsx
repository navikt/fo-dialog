import React from 'react';
import { DialogData } from '../../utils/Typer';
import { EtikettLiten, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { EtikettListe } from '../dialog/EtikettListe';
import { formaterDate } from '../../utils/Date';
import { ReactComponent as DialogIkon } from './snakkeboble.svg';
import { ReactComponent as AktivitetsIkon } from './aktivitet-dialog-lest.svg';
import WrapInReactLink from '../../felleskomponenter/WrapInReactLink';
import classNames from 'classnames';

import './DialogPreview.less';
import { useFetchAktivitetMedFnrContext } from '../../api/UseAktivitet';

interface IkonProps {
    dialog: DialogData;
}
interface Props {
    dialog: DialogData;
    valgtDialogId?: string;
}

function DialogPreviewIkon(props: IkonProps) {
    const erAktivitet: boolean = props.dialog.aktivitetId !== null;
    const ikonCls = classNames('dialog-preview__ikon', { 'dialog-preview__ikon--lest': !props.dialog.lest });
    if (erAktivitet) {
        return (
            <div className={ikonCls}>
                <AktivitetsIkon />
            </div>
        );
    }
    return (
        <div className={ikonCls}>
            <DialogIkon />
        </div>
    );
}

function DialogPreview(props: Props) {
    const { dialog, valgtDialogId } = props;
    const { id, sisteDato, aktivitetId, lest, overskrift, sisteTekst } = dialog;
    const findAktivitet = useFetchAktivitetMedFnrContext();

    const datoString = !!sisteDato ? formaterDate(sisteDato) : '';
    const aktivitet = findAktivitet(aktivitetId);
    const lenkepanelCls = classNames('dialog-preview', {
        'dialog-preview--lest': lest,
        'dialog-preview--valgt': id === valgtDialogId
    });

    return (
        <LenkepanelBase className={lenkepanelCls} href={`/${id}`} linkCreator={WrapInReactLink}>
            <DialogPreviewIkon dialog={dialog} />
            <div className="dialog-preview__internal-div">
                <Systemtittel className="lenkepanel__heading">{aktivitet ? aktivitet.tittel : overskrift}</Systemtittel>
                <Normaltekst className="dialog-preview__last-henvendelse">{sisteTekst}</Normaltekst>
                <EtikettLiten className="dialog-preview__dato">{datoString}</EtikettLiten>
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
