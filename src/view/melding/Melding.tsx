import { PersonIcon } from '@navikt/aksel-icons';
import { BodyShort, Chat, Link } from '@navikt/ds-react';
import classNames from 'classnames';
import React from 'react';

import { ViktigMelding } from '../../felleskomponenter/etiketer/Etikett';
import { formaterDateAndTime } from '../../utils/Date';
import { MeldingsData } from '../../utils/Typer';
import { useUserInfoContext } from '../BrukerProvider';
import { linkify } from './linkify';
import { useCompactMode } from '../../featureToggle/FeatureToggleProvider';

function accessibleText(erBruker: boolean, erMeldingFraBruker: boolean) {
    if (erMeldingFraBruker) {
        return erBruker ? 'Deg' : 'Bruker';
    }

    return 'NAV';
}

interface Props {
    melding: MeldingsData;
    viktigMarkering: boolean;
}

export function Melding(props: Props) {
    const compactMode = useCompactMode();
    const { viktigMarkering } = props;
    const { avsender, sendt, tekst, avsenderId } = props.melding;
    const brukerData = useUserInfoContext();
    const erBruker = brukerData?.erBruker ?? false;

    const erMeldingFraBruker: boolean = avsender === 'BRUKER';
    const date: string = formaterDateAndTime(sendt);
    const toppTekst = erMeldingFraBruker || !avsenderId ? date : `${date} - ${avsenderId}`;

    const erFraSegSelv = (erBruker && erMeldingFraBruker) || (!erBruker && !erMeldingFraBruker);

    const backgroundColor = erFraSegSelv ? 'rgba(235, 252, 255, 1)' : 'rgba(255, 255, 255, 1)';
    const avatarBgColor = erFraSegSelv ? 'rgba(181, 241, 255, 1)' : 'rgba(255, 255, 255, 1)';

    return (
        <div className="mt-4" role="row">
            <BodyShort className="hidden">{accessibleText(erBruker, erMeldingFraBruker)}</BodyShort>
            <Chat
                timestamp={toppTekst}
                size={compactMode ? 'small' : 'medium'}
                avatar={erMeldingFraBruker ? <PersonIcon aria-hidden className={'!h-6 !w-6'} /> : 'NAV'}
                position={erMeldingFraBruker ? 'right' : 'left'}
                backgroundColor={backgroundColor}
                avatarBgColor={avatarBgColor}
                className={classNames('p-0', {
                    'md:pl-16': erMeldingFraBruker && !compactMode,
                    'md:pr-16': !erMeldingFraBruker && !compactMode
                })}
            >
                <Chat.Bubble className="">
                    <div className="flex flex-col items-start">
                        <ViktigMelding visible={viktigMarkering} />
                        <span className="mt-2 whitespace-pre-wrap">{linkify(tekst)}</span>
                    </div>
                </Chat.Bubble>
            </Chat>
        </div>
    );
}
