import { PersonIcon } from '@navikt/aksel-icons';
import { BodyShort, Chat, Link } from '@navikt/ds-react';
import React from 'react';

import { ViktigMelding } from '../../felleskomponenter/etiketer/Etikett';
import { formaterDateAndTime } from '../../utils/Date';
import { MeldingsData } from '../../utils/Typer';
import { useUserInfoContext } from '../BrukerProvider';

function accessibleText(erBruker: boolean, erMeldingFraBruker: boolean) {
    if (erMeldingFraBruker) {
        return erBruker ? 'Deg' : 'Bruker';
    }

    return 'NAV';
}

interface Props {
    henvendelseData: MeldingsData;
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
                        <span className="mt-2 whitespace-pre-wrap">{toNodes(linkify(tekst))}</span>
                    </div>
                </Chat.Bubble>
            </Chat>
        </div>
    );
}

const urlRegex = /(((\b(https?):\/\/)|(www\.))[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
interface TextSection {
    value: string;
    type: 'text' | 'link';
}
const toNodes = (sections: TextSection[]) => {
    return (
        <>
            {sections.map((section, index) => {
                if (section.type === 'text') {
                    return <span key={index}>{section.value}</span>;
                } else {
                    return (
                        <Link key={index} href={section.value}>
                            {section.value}
                        </Link>
                    );
                }
            })}
        </>
    );
};
function linkify(text: string): TextSection[] {
    const matches = text.match(urlRegex);
    if (!matches?.length) return [{ value: text, type: 'text' }];
    return matches.reduce(
        ({ sections, remainingText }, nextMatch) => {
            const [beforeText, ...rest] = remainingText.split(nextMatch);
            return {
                remainingText: rest.join(''),
                sections: [
                    ...sections,
                    { value: beforeText, type: 'text' as const },
                    { value: nextMatch, type: 'link' as const }
                ]
            };
        },
        { sections: [] as TextSection[], remainingText: text }
    ).sections;
}
