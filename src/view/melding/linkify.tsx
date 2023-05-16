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
