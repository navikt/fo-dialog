import React from 'react';
import { DialogData } from '../utils/typer';
import { EtikettLiten, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { EtikettListe } from './EtikettListe';
import './dialogpreview.less';
import { formaterDate } from '../utils/date';
import { ReactComponent as DialogIkon } from './Dialog_lest.svg';
import { ReactComponent as AktivitetsIkon } from './aktivitet_lest.svg';
import WrapInReactLink from '../component/hoc/wrapInReactLink';
import classNames from 'classnames';

interface Props {
    dialog: DialogData;
}

function DialogPreviewIkon(props: Props) {
    const erAktivitet: boolean = props.dialog.aktivitetId !== null;
    if (erAktivitet) {
        return <AktivitetsIkon className="dialog-preview__ikon" />;
    }
    return <DialogIkon className="dialog-preview__ikon" />;
}

export function DialogPreview(props: Props) {
    const datoString = !!props.dialog.sisteDato ? formaterDate(props.dialog.sisteDato) : '';
    const cls = classNames('dialog-preview', {
        'dialog-preview--lest': props.dialog.lest
    });
    return (
        <LenkepanelBase className={cls} href={`/${props.dialog.id}`} linkCreator={WrapInReactLink}>
            <DialogPreviewIkon dialog={props.dialog} />
            <div className="dialog-preview__internal-div">
                <Systemtittel className="lenkepanel__heading"> {props.dialog.overskrift}</Systemtittel>
                <Normaltekst className="dialog-preview__last-henvendelse">{props.dialog.sisteTekst}</Normaltekst>
                <EtikettLiten>{datoString}</EtikettLiten>
                <EtikettListe dialog={props.dialog} />
            </div>
        </LenkepanelBase>
    );
}
