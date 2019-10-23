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
import { matchPath, RouteComponentProps, withRouter } from 'react-router';

import './DialogPreview.less';

interface IkonProps {
    dialog: DialogData;
}
interface Props extends RouteComponentProps<{ dialogId?: string }> {
    dialog: DialogData;
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
    const datoString = !!props.dialog.sisteDato ? formaterDate(props.dialog.sisteDato) : '';
    const valgtDialogId = matchPath<{ dialogId: string }>(props.location.pathname, '/:dialogId');

    const lenkepanelCls = classNames('dialog-preview', {
        'dialog-preview--lest': props.dialog.lest,
        'dialog-preview--valgt': valgtDialogId && props.dialog.id === valgtDialogId.params.dialogId
    });
    return (
        <LenkepanelBase className={lenkepanelCls} href={`/${props.dialog.id}`} linkCreator={WrapInReactLink}>
            <DialogPreviewIkon dialog={props.dialog} />
            <div className="dialog-preview__internal-div">
                <Systemtittel className="lenkepanel__heading"> {props.dialog.overskrift}</Systemtittel>
                <Normaltekst className="dialog-preview__last-henvendelse">{props.dialog.sisteTekst}</Normaltekst>
                <EtikettLiten className="dialog-preview__dato">{datoString}</EtikettLiten>
                <EtikettListe dialog={props.dialog} />
            </div>
        </LenkepanelBase>
    );
}

export default withRouter(DialogPreview);
