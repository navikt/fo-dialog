import { PersonIcon } from '@navikt/aksel-icons';
import { BodyShort, Chat } from '@navikt/ds-react';
import React from 'react';

import { ViktigMelding } from '../../felleskomponenter/etiketer/Etikett';
import { formaterDateAndTime } from '../../utils/Date';
import { HenvendelseData } from '../../utils/Typer';
import { useUserInfoContext } from '../BrukerProvider';

function accessibleText(erBruker: boolean, erMeldingFraBruker: boolean) {
    if (erMeldingFraBruker) {
        return erBruker ? 'Deg' : 'Bruker';
    }

    return 'NAV';
}

interface Props {
    henvendelseData: HenvendelseData;
    viktigMarkering: boolean;
}

export function Melding(props: Props) {
    const { viktigMarkering } = props;
    const { avsender, sendt, tekst, avsenderId } = props.henvendelseData;
    const brukerData = useUserInfoContext();
    const erBruker = brukerData?.erBruker ?? false;

    const erMeldingFraBruker: boolean = avsender === 'BRUKER';
    const date: string = formaterDateAndTime(sendt);
    const toppTekst = erMeldingFraBruker || !avsenderId ? date : `${date} - ${avsenderId}`;

    const erFraSegSelv = (erBruker && erMeldingFraBruker) || (!erBruker && !erMeldingFraBruker);

    const backgroundColor = erFraSegSelv ? 'rgba(235, 252, 255, 1)' : 'rgba(255, 255, 255, 1)';
    const avatarBgColor = erFraSegSelv ? 'rgba(181, 241, 255, 1)' : 'rgba(255, 255, 255, 1)';

    return (
        <div className="mt-4">
            <BodyShort className="hidden">{accessibleText(erBruker, erMeldingFraBruker)}</BodyShort>
            <Chat
                timestamp={toppTekst}
                avatar={erMeldingFraBruker ? <PersonIcon aria-hidden className={'!w-6 !h-6'} /> : 'NAV'}
                position={erMeldingFraBruker ? 'right' : 'left'}
                backgroundColor={backgroundColor}
                avatarBgColor={avatarBgColor}
            >
                <Chat.Bubble>
                    <div className="flex flex-col items-start">
                        <ViktigMelding visible={viktigMarkering} />
                        <span className="mt-2 whitespace-pre-wrap">{tekst}</span>
                    </div>
                </Chat.Bubble>
            </Chat>
        </div>
    );
}
