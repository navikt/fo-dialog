import React from 'react';

export default function DialogAktivitetIkon(props: { lest: boolean }) {
    const title = props.lest ? 'Dialog om aktivitet' : 'Ulest dialog om aktivitet';
    return (
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 24 24">
            <title>{title}</title>
            <path
                d="M18.1 4H3.9C2.3 4 1 5.3 1 6.9v9.2C1 17.7 2.3 19 3.9 19H11v-7h10V6.9C21 5.3 19.7 4 18.1 4z"
                fill="none"
            />
            <path
                className="st1"
                d="M3.9 19C2.3 19 1 17.7 1 16.1V6.9C1 5.3 2.3 4 3.9 4h14.2C19.7 4 21 5.3 21 6.9V12h1V6.9C22 4.7 20.3 3 18.1 3H3.9C1.7 3 0 4.7 0 6.9v9.2C0 18.3 1.7 20 3.9 20H11v-1H3.9z"
            />
            <path
                className="st1"
                d="M18.5 12.8c-3.2 0-5.8 2.1-5.8 4.7 0 1.2.5 2.3 1.5 3.1l-1 2c-.1.2-.1.4.1.5.1.1.2.1.3.1h.2l2.9-1.3c.6.1 1.2.2 1.8.2 3.2 0 5.8-2.1 5.8-4.7-.1-2.5-2.6-4.6-5.8-4.6zm0 8.4c-.6 0-1.2-.1-1.7-.2h-.3l-1.8.8.6-1.1c.1-.2 0-.5-.1-.6-.9-.7-1.4-1.6-1.4-2.6 0-2.1 2.1-3.7 4.8-3.7s4.8 1.7 4.8 3.7c-.1 2-2.3 3.7-4.9 3.7z"
                id="line_x2F_bubble-chat-2-copy"
            />
            <path
                className="st1"
                d="M3.6 8h9.8c.3 0 .6.3.6.6s-.3.6-.6.6H3.6c-.3 0-.6-.3-.6-.6s.3-.6.6-.6z"
                id="Rectangle-Copy-3"
            />
            <path
                className="st1"
                d="M3.6 11h9.8c.3 0 .6.3.6.6s-.3.6-.6.6H3.6c-.3 0-.6-.3-.6-.6s.3-.6.6-.6z"
                id="Rectangle-Copy-4"
            />
            <g id="Rectangle-Copy-5">
                <path className="st1" d="M3.6 14h1.8c.3 0 .6.3.6.6s-.3.6-.6.6H3.6c-.3 0-.6-.3-.6-.6s.3-.6.6-.6z" />
            </g>
        </svg>
    );
}
