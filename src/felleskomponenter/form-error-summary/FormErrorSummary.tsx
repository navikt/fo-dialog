import React, { useEffect, useRef } from 'react';
import Lenke from 'nav-frontend-lenker';
import styles from './FormErrorSummary.module.less';

interface ErrorProps<T> {
    name: string;
    error: T;
}

function Error<T>(props: ErrorProps<T>) {
    const { name, error } = props;
    return (
        <li key={`${name}-${error}`}>
            <Lenke className={styles.lenke} href={`#${name}`}>
                {error}
            </Lenke>
        </li>
    );
}

type Mapped<S, T> = {
    [P in keyof S]: T;
};

interface FormErrorSummaryProps<T> {
    submittoken?: string;
    errors: Mapped<T, string>;
}

function FormErrorSummary<T>(props: FormErrorSummaryProps<T>) {
    const { submittoken, errors } = props;
    const summaryRef = useRef<HTMLDivElement>(null);

    // focus on summary ref when shown
    useEffect(() => {
        if (submittoken && summaryRef.current) {
            summaryRef.current.focus();
        }
    }, [submittoken, summaryRef]);

    if (!submittoken) {
        return null;
    }

    return (
        <div
            ref={summaryRef}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            className={styles.summary}
            tabIndex={-1}
        >
            <h3>Fyll ut obligatoriske felt</h3>
            <ul>
                {Object.entries(errors).map(([name, error]) => (
                    <Error key={name} error={error} name={name} />
                ))}
            </ul>
        </div>
    );
}

export default FormErrorSummary;
