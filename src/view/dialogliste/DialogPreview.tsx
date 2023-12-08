import { BodyShort, Detail, Heading, LinkPanel } from '@navikt/ds-react';
import classNames from 'classnames';
import React, { KeyboardEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useRoutes } from '../../routes';
import { Aktivitet, ArenaAktivitet } from '../../utils/aktivitetTypes';
import { formaterDate } from '../../utils/Date';
import { DialogData, StringOrNull } from '../../utils/Typer';
import { getDialogTittel } from '../aktivitet/TextUtils';
import { findAktivitet, useAktivitetContext } from '../AktivitetProvider';
import { useCompactMode } from '../../featureToggle/FeatureToggleProvider';
import { useEventListener } from '../utils/useEventListner';
import styles from './DialogPreview.module.css';
import { EtikettListe } from './EtikettListe';
import Ikon from './ikon/Ikon';
import { HandlingsType } from '../ViewState';

interface TittelProps {
    aktivitet?: Aktivitet | ArenaAktivitet;
    tittel: StringOrNull;
}

const ALIGN_TO_BOTTOM: ScrollIntoViewOptions = { block: 'end', inline: 'nearest' };

function Tittel(props: TittelProps) {
    const tittel = props.aktivitet ? getDialogTittel(props.aktivitet) : props.tittel;
    return (
        <Heading className="overflow-hidden text-ellipsis" level="2" size="small">
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
    tabable: boolean;
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
    const compactMode = useCompactMode();

    const { dialog, valgtDialogId, tabable } = props;
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

    const navigate = useNavigate();
    const { dialogRoute } = useRoutes();
    const onGoTo = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        navigate(dialogRoute(id), { state: { sistHandlingsType: HandlingsType.ingen } });
    };

    return (
        <LinkPanel
            className={classNames('my-1 max-w-full !gap-0 border p-2', styles.dialogPreview, {
                'bg-[#e6f0ff]': detteErValgtDialog,
                [styles.linkPanelCompactMode]: compactMode,
                [styles.ulestDialogCompactMode]: !dialog.lest && compactMode
            })}
            tabIndex={tabable ? 0 : -1}
            href={dialogRoute(id)}
            id={`dialog-${id}`}
            // aria-current={detteErValgtDialog && true}
            aria-selected={detteErValgtDialog}
            aria-activedescendant={detteErValgtDialog}
            onClick={onGoTo}
        >
            {!dialog.lest && compactMode ? <div className="w-2 bg-surface-info"></div> : null}
            <div className={classNames('flex flex-1 flex-row ', { 'py-2 pl-2 ': compactMode })}>
                {compactMode ? null : <Ikon dialog={dialog} />}
                <div className="min-w-0 flex-grow">
                    <BodyShort className="sr-only">{typeText(dialog)}</BodyShort>
                    <Tittel tittel={overskrift} aktivitet={aktivitet} />
                    <Detail>{datoString}</Detail>
                    <EtikettListe dialog={dialog} />
                    <BodyShort className="hidden">{meldingerText(dialog.meldinger.length)}</BodyShort>
                </div>
                <BodyShort aria-hidden="true" className="ml-2 flex items-center">
                    {dialog.meldinger.length}
                </BodyShort>
                <div ref={dialogref}></div>
            </div>
        </LinkPanel>
    );
}

interface ListeProps {
    dialoger: DialogData[];
}

let skalFadeIn = false;

export function DialogPreviewListe({ dialoger }: ListeProps) {
    const [antallDialoger, setAntallDialoger] = useState<number | undefined>(undefined);

    const { dialogId: valgtDialog } = useParams();
    // Event listeners don't update with props, must use mutable variables
    // Keep focused element, fallback to valgtDialog
    const focusedElementId = useRef(valgtDialog);

    useEffect(() => {
        focusedElementId.current = valgtDialog;
        console.log('trigger valgtDialog');
    }, [valgtDialog]);

    const focusById = (id?: string) => {
        if (!id) return;
        console.log(`Focusing dialog dialog-${id}`);
        focusedElementId.current = id;
        document.getElementById(`dialog-${id}`)?.focus();
    };
    const selectPrevious = () => {
        if (!dialoger.length) return;
        if (dialoger.length === 1) return;
        if (!focusedElementId.current) return focusById(dialoger[0]?.id);
        const currentIndex = dialoger.findIndex((it) => it.id === focusedElementId.current);
        console.log('Select previous', {
            currentIndex,
            valgtDialog: focusedElementId.current,
            lastIndex: currentIndex === dialoger.length - 1,
            nextId: dialoger[currentIndex + 1].id
        });
        if (currentIndex === 0) return;
        const previousId = dialoger[currentIndex - 1]?.id;
        focusById(previousId);
    };
    const selectNext = () => {
        if (!dialoger.length) return;
        if (dialoger.length === 1) return;
        if (!focusedElementId.current) return focusById(dialoger[0]?.id);
        const currentIndex = dialoger.findIndex((it) => it.id === focusedElementId.current);
        console.log('Select next', {
            currentIndex,
            valgtDialog: focusedElementId.current,
            lastIndex: currentIndex === dialoger.length - 1,
            nextId: dialoger[currentIndex + 1].id
        });
        if (currentIndex === dialoger.length - 1) return;
        const nextId = dialoger[currentIndex + 1]?.id;
        focusById(nextId);
    };
    const handleKeydown: KeyboardEventHandler = (event) => {
        switch (event.key) {
            case 'ArrowDown':
                selectNext();
                break;
            case 'ArrowUp':
                selectPrevious();
                break;
            default:
                break;
        }
    };

    const onFocus = () => {
        console.log('Add keyboard listener' + '');
        window.addEventListener('keydown', handleKeydown);
    };
    const onBlur = () => {
        console.log('Removing event listener');
        window.removeEventListener('keydown', handleKeydown);
    };

    useEffect(() => {
        if (antallDialoger === undefined) {
            skalFadeIn = false;
        } else if (dialoger.length === antallDialoger + 1) {
            skalFadeIn = true;
        }
        setAntallDialoger(dialoger.length);
    }, [dialoger]);

    if (dialoger.length === 0) return null;
    return (
        <div role="region" aria-live="polite">
            <ul aria-label="Dialogliste" tabIndex={0} onFocus={onFocus} onBlur={onBlur}>
                {dialoger.map((dialog, index) => (
                    <li
                        key={dialog.id}
                        className={classNames('', {
                            [styles.fadeIn]: index === 0 && skalFadeIn
                        })}
                    >
                        <DialogPreview
                            // tabable={valgtDialog ? valgtDialog === dialog.id : index === 0}
                            dialog={dialog}
                            valgtDialogId={valgtDialog}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DialogPreview;
