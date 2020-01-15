import { useEffect } from 'react';

const selectHodefot = () => Array.from(document.querySelectorAll('.hodefot'));

function skjulElementerForMobil() {
    selectHodefot().forEach(el => {
        el.classList.add('hidden-sm');
    });
}

function visElementer() {
    selectHodefot().forEach(el => {
        el.classList.remove('hidden-sm');
    });
}

export function useMobilVisning() {
    useEffect(() => {
        skjulElementerForMobil();
        return () => visElementer();
    }, []);
}
