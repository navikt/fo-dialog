// Kopiert fra felleskomponenter, fjernet oppstykking i avsnitt.
import * as PT from 'prop-types';
import * as React from 'react';
import { LenkeFragment, SpanFragment } from 'nav-frontend-tekstomrade/lib/fragments';

const uriRegex = /((?:[\w-]+:\/\/?|www(?:-\w+)?\.)[^\s()<>]+\w)/g;

function tilJSXLenke(fragment: string, fragmentIndex: string | number | undefined) {
    const urimatch = uriRegex.exec(fragment);
    if (urimatch === null) {
        return <SpanFragment key={fragmentIndex}>{fragment}</SpanFragment>;
    }
    return <LenkeFragment key={fragmentIndex} href={urimatch[0]} />;
}

function leggTilLenkerJSX(innhold: string) {
    const fragments = innhold.split(uriRegex);
    if (fragments.length === 1) {
        const text = fragments[0];
        if (!text || text.length === 0) {
            return null;
        }
        return <SpanFragment>{text}</SpanFragment>;
    }

    return fragments.map(tilJSXLenke);
}

export interface TekstomradeProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Ren tekst-innhold som skal formateres
     */
    children: string;
}

class Tekstomrade extends React.Component<TekstomradeProps> {
    render() {
        const { children, ...props } = this.props;

        const tekst = leggTilLenkerJSX(children);
        return <div {...props}>{tekst}</div>;
    }
}

(Tekstomrade as React.ComponentClass).propTypes = {
    children: PT.string
};

(Tekstomrade as React.ComponentClass).defaultProps = {
    children: ''
};

export default Tekstomrade;
