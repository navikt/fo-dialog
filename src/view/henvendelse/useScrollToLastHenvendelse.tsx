import { useLayoutEffect, useRef } from 'react';

function selectHenvendelseList() {
    return document.querySelector('.henvendelse-list');
}

export function smoothScrollToLastHenvendelse() {
    const elem = selectHenvendelseList();
    if (elem !== null) {
        elem.scrollTo({ top: elem.scrollHeight, behavior: 'smooth' });
    }
}

export function useScrollToLastHenvendelse(dialogId: string, lastHenvendelseId?: string) {
    const componentIsMounted = useRef(false);

    useLayoutEffect(() => {
        componentIsMounted.current = true;
        //safari will not scroll correctly without waiting until next animation frame
        requestAnimationFrame(() => {
            const elem = selectHenvendelseList();
            if (elem !== null) {
                elem.scrollTop = elem.scrollHeight;
            }
        });

        return () => {
            componentIsMounted.current = false;
        };
    }, [dialogId, componentIsMounted]);

    useLayoutEffect(() => {
        if (componentIsMounted.current) {
            smoothScrollToLastHenvendelse();
        }
    }, [lastHenvendelseId, componentIsMounted]);
}
