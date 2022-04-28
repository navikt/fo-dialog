import { ASTNode, ReactElementDescription, Rule, RuleScope } from '@navikt/textparser';
import { getText } from '@navikt/textparser/dist/utils';
import Lenke from 'nav-frontend-lenker';
import React, { MouseEvent, ReactNode } from 'react';

import { useFnrContext } from '../Provider';

function CustomLenkeWrapper(props: { href: string; children: ReactNode }) {
    const { href, children } = props;
    const fnr = useFnrContext();

    const _onClick = (event: MouseEvent) => {
        if (!fnr) {
            return;
        }

        if (href.includes('aktivitetsplan/aktivitet/vis')) {
            event.preventDefault();

            const urlSplit = href.split('/');
            const aktivitetID = urlSplit[urlSplit.length - 1];
            window.history.replaceState(
                {},
                'aktivitetsplan',
                `/veilarbpersonflatefs/${fnr}/aktivitet/vis/${aktivitetID}`
            );

            window.dispatchEvent(new CustomEvent('visAktivitetsplan', { detail: aktivitetID }));
        }
    };
    return (
        <Lenke href={href} onClick={_onClick}>
            {children}
        </Lenke>
    );
}

// /\[([^\]\[]+)\]\(([^ ]+)\)/ <- maybe better regex. matches [string](whatever)
export const markdownLink: Rule = {
    name: 'markdownLink',
    scope: RuleScope.INLINE,
    regex: /\[([^\][]+)]\(([^\s()<>]+\w)\)/, // matches only [string](single-string)
    parse(match): ASTNode {
        return { name: 'markdownLink', content: [match.capture[0], match.capture[1]] };
    },
    react(node: ASTNode): ReactElementDescription {
        if (typeof node === 'string') {
            return { type: 'p' };
        }

        const text = getText(node.content[1]);

        const href = text.startsWith('www') ? `https://${text}` : text;

        const lenkeNavn = node.content[0];

        if (typeof lenkeNavn === 'string') {
            return { type: CustomLenkeWrapper, props: { href: href }, children: [lenkeNavn] };
        }

        return { type: CustomLenkeWrapper, props: { href: href }, children: [getText(lenkeNavn)] };
    }
};
