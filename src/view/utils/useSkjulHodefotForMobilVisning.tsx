import { useLayoutEffect } from 'react';

const selectHodefot = () => Array.from(document.querySelectorAll('.hodefot'));

function skjulElementerForMobil() {
    selectHodefot().forEach(el => {
        el.classList.add('hide-on-smaller-then-md');
    });
}

function visElementer() {
    selectHodefot().forEach(el => {
        el.classList.remove('hide-on-smaller-then-md');
    });
}

export function useSkjulHodefotForMobilVisning() {
    useLayoutEffect(() => {
        skjulElementerForMobil();
        return () => visElementer();
    }, []);
}
