import { BodyShort, Detail, Heading, LinkPanel } from '@navikt/ds-react';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Flipped, Flipper } from 'react-flip-toolkit';
import { useNavigate } from 'react-router';

import { useRoutes } from '../../routes';
import { Aktivitet, ArenaAktivitet } from '../../utils/aktivitetTypes';
import { formaterDate } from '../../utils/Date';
import { DialogData, StringOrNull } from '../../utils/Typer';
import { getDialogTittel } from '../aktivitet/TextUtils';
import { findAktivitet, useAktivitetContext } from '../AktivitetProvider';
import { useEventListener } from '../utils/useEventListner';
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
        <Heading level="2" size="small">
            {tittel}
        </Heading>
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

export enum TabId {
    AKTIVITETSPLAN = 'AKTIVITETSPLAN',
    DIALOG = 'DIALOG',
    VEDTAKSSTOTTE = 'VEDTAKSSTOTTE',
    DETALJER = 'DETALJER',
    ARBEIDSMARKEDSTILTAK = 'ARBEIDSMARKEDSTILTAK'
}

export type TabChangeEvent = { tabId: string };
function DialogPreview(props: Props) {
    const dialogref = useRef<HTMLDivElement | null>(null);
    const [skalScrolle, setSkalScrolle] = useState<boolean>(false);

    const { dialog, valgtDialogId } = props;
    const { id, sisteDato, aktivitetId, lest, overskrift, historisk } = dialog;
    const detteErValgtDialog = id === valgtDialogId;

    useEventListener<TabChangeEvent>('veilarbpersonflatefs.tab-clicked', ({ detail: { tabId } }) => {
        if (tabId === TabId.DIALOG) setSkalScrolle(true);
    });

    useEffect(() => {
        const dialogElement: HTMLElement | null | undefined = dialogref?.current?.parentElement;
        if (skalScrolle && dialogElement && detteErValgtDialog) {
            dialogElement.scrollIntoView(ALIGN_TO_BOTTOM);
            setSkalScrolle(false);
        }
    }, [dialogref, detteErValgtDialog, skalScrolle]);

    const aktivitetData = useAktivitetContext();

    const datoString = !!sisteDato ? formaterDate(sisteDato) : '';
    const aktivitet = findAktivitet(aktivitetData, aktivitetId);

    const erLest = lest || historisk;

    const markoer = erLest ? styles.markoerLest : styles.markoerUlest;

    const navigate = useNavigate();
    const { dialogRoute } = useRoutes();
    const onGoTo = (event) => {
        event.preventDefault();
        navigate(dialogRoute(id));
    };
    return (
        <LinkPanel
            className={classNames('my-2 border !gap-0', styles.preview, {
                [styles.innholdUlest]: !erLest,
                ['bg-surface-selected border-border-selected']: detteErValgtDialog
            })}
            href={dialogRoute(id)}
            onClick={onGoTo}
        >
            <div className="flex flex-row">
                {/*<div className={markoer} />*/}
                <Ikon dialog={dialog} />
                <div className="flex-grow">
                    <BodyShort className="hidden">{typeText(dialog)}</BodyShort>
                    <Tittel tittel={overskrift} aktivitet={aktivitet} />
                    <Detail>{datoString}</Detail>
                    <EtikettListe dialog={dialog} />
                    <BodyShort className="hidden">{meldingerText(dialog.henvendelser.length)}</BodyShort>
                </div>
                {/*<BodyShort aria-hidden="true" className="flex items-center">*/}
                {/*    {dialog.henvendelser.length}*/}
                {/*</BodyShort>*/}
                <div ref={dialogref}></div>
            </div>
        </LinkPanel>
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
            <ul aria-label="Dialogliste">
                {dialoger.map((dialog) => (
                    <Flipped flipId={dialog.id} key={dialog.id}>
                        <li>
                            <DialogPreview dialog={dialog} key={dialog.id} valgtDialogId={valgDialog} />
                        </li>
                    </Flipped>
                ))}
            </ul>
        </Flipper>
    );
}

export default DialogPreview;
