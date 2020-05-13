import { Rule, RuleScope, ASTNode, ReactElementDescription } from '@navikt/textparser';
import { getText } from '@navikt/textparser/dist/utils';
import Lenke from 'nav-frontend-lenker';

// /\[([^\]\[]+)\]\(([^ ]+)\)/ <- maybe better regex. matches [string](whatever)
export const markdownLink: Rule = {
    name: 'markdownLink',
    scope: RuleScope.INLINE,
    regex: /\[([^\][]+)\]\(([^\s()<>]+\w)\)/, // matches only [string](single-string)
    parse(match): ASTNode {
        return { name: 'markdownLink', content: [match.capture[0], match.capture[1]] };
    },
    react(node: ASTNode): ReactElementDescription {
        if (typeof node === 'string') {
            return { type: 'p' };
        }

        const text = getText(node.content[1]);

        const href = text.startsWith('www') ? `https://${text}` : text;

        return { type: Lenke, props: { href: `${href}` }, children: [node.content[0]] };
    }
};
