import { Link } from '@navikt/ds-react';
import React from 'react';

const urlRegex = /((?:[\w-]+:\/\/?|www(?:-\w+)?\.)[^\s()<>]+)/gi;

interface TextSection {
    value: string;
    type: 'text' | 'link';
}

const toNodes = (sections: TextSection[]) => {
    return (
        <>
            {sections.map((section, index) => {
                if (section.type === 'text') {
                    return (
                        <span key={index} className="[overflow-wrap:anywhere]">
                            {section.value}
                        </span>
                    );
                } else {
                    const href = section.value.toLowerCase().startsWith('www.')
                        ? `https://${section.value}`
                        : section.value;
                    return (
                        <Link className="break-all" key={index} href={href}>
                            {section.value}
                        </Link>
                    );
                }
            })}
        </>
    );
};
export const splitOnLinks = (text: string): TextSection[] => {
    const matches = text.match(urlRegex);
    if (!matches?.length) return [{ value: text, type: 'text' }];
    const parts = text.split(urlRegex);
    return parts
        .filter((part) => part !== '')
        .map((part) => {
            if (matches.includes(part)) {
                return { value: part, type: 'link' };
            } else {
                return { value: part, type: 'text' };
            }
        });
};

export const linkify = (text: string) => toNodes(splitOnLinks(text));

export const linkifyToMarkdown = (text: string) => splitOnLinks(text)
    .reduce((result: string, current: TextSection) => {
        if (current.type === "link") {
            const href = current.value.toLowerCase().startsWith('www.')
                ? `https://${current.value}`
                : current.value;

            return result + `[${current.value}](${href})`
        }
        return result + current.value
    }, "")