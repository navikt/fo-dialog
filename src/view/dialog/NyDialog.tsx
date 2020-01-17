import React, { useEffect } from 'react';
import { useViewContext } from '../Provider';
import useKansendeMelding from '../../utils/UseKanSendeMelding';
import { endreDialogSomVises, sendtNyDialog } from '../ViewState';
import { useSkjulHodefotForMobilVisning } from '../utils/useSkjulHodefotForMobilVisning';
import { DialogHeader } from './DialogHeader';
import { useFetchAktivitetMedFnrContext } from '../../api/UseAktivitet';
import NyDialogForm from './NyDialogForm';
import { useAktivitetId } from '../utils/useAktivitetId';

function NyDialog() {
    const kansendeMelding = useKansendeMelding();
    useSkjulHodefotForMobilVisning();

    const aktivitetId = useAktivitetId();
    const { findAktivitet, isAktivitetLoading } = useFetchAktivitetMedFnrContext();
    const aktivitet = findAktivitet(aktivitetId);

    const { viewState, setViewState } = useViewContext();

    useEffect(() => {
        setViewState(endreDialogSomVises());
    }, [setViewState]);

    if (!kansendeMelding || (aktivitetId && isAktivitetLoading())) {
        return <div className="dialog" />;
    }

    return (
        <div className="dialog">
            <DialogHeader aktivitetId={aktivitetId} />
            <NyDialogForm
                onSubmit={() => setViewState(sendtNyDialog(viewState))}
                defaultTema={aktivitet?.tittel}
                aktivitetId={aktivitetId}
            />
        </div>
    );
}

export default NyDialog;
