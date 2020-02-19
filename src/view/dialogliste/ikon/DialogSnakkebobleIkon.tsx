import React from 'react';

export default function DialogSnakkebobleIkon(props: { lest: boolean }) {
    const title = props.lest ? 'Dialog' : 'Ulest dialog';

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>{title}</title>
            <path
                d="M12 .9c6.6 0 12 4.4 12 9.9 0 5.4-5.4 9.9-12 9.9-1.4 0-2.7-.2-4-.6l-6.4 3h-.2c-.1 0-.3-.1-.4-.2-.1-.2-.2-.4-.1-.6l2.4-4.8C1.2 15.7 0 13.3 0 10.8 0 5.3 5.4.9 12 .9zm0 18.7c6.1 0 11-4 11-8.9s-4.9-8.9-11-8.9-11 4-11 8.9c0 2.4 1.2 4.6 3.3 6.3.2.1.2.4.1.6l-1.9 3.9L7.8 19c.1 0 .2 0 .3.1 1.3.4 2.6.5 3.9.5z"
                fill="#3E3832"
            />
        </svg>
    );
}
