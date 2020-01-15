import { useEffect } from 'react';
import { useMedia } from '../../felleskomponenter/hooks/useMedia';

const selectHodefot = () => Array.from(document.querySelectorAll('.hodefot'));

function skjulElementerForMobil() {
    selectHodefot().forEach(el => {
        (el as HTMLDivElement).style.display = 'none';
    });

    (document.querySelector('.dialogbanner') as HTMLDivElement).style.display = 'none';
}

function visElementer() {
    selectHodefot().forEach(el => {
        (el as HTMLDivElement).style.display = '';
    });

    (document.querySelector('.dialogbanner') as HTMLDivElement).style.display = '';
}

export function useMobilVisning() {
    const mobilVisning = useMedia('(max-width: 800px)');
    console.log('??');

    useEffect(() => {
        console.log('mobile? ', mobilVisning);

        if (mobilVisning) {
            skjulElementerForMobil();
        } else {
            visElementer();
        }

        return () => visElementer();
    }, [mobilVisning]);
}
