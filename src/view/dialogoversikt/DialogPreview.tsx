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
import { RouteComponentProps, withRouter } from 'react-router';
import UseFetch from '../../utils/UseFetch';
import { Aktivitet } from '../../utils/AktivitetTypes';

import './DialogPreview.less';

interface IkonProps {
    dialog: DialogData;
}
interface Props extends RouteComponentProps<{ dialogId?: string }> {
    dialog: DialogData;
    valgtDialogId: string | null;
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

export function DialogPreview(props: Props) {
    const { dialog, valgtDialogId } = props;
    const { id, sisteDato, aktivitetId, lest, overskrift, sisteTekst } = dialog;
    const datoString = !!sisteDato ? formaterDate(sisteDato) : '';
    const aktivitet = aktivitetId && UseFetch<Aktivitet>(`/veilarbaktivitet/api/aktivitet/${aktivitetId}`).data;
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

export default withRouter(DialogPreview);
