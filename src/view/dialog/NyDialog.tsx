import React, { useEffect } from 'react';
import { useViewContext } from '../Provider';
import useKansendeMelding from '../../utils/UseKanSendeMelding';
import { endreDialogSomVises, sendtNyDialog } from '../ViewState';
import { useSkjulHodefotForMobilVisning } from '../utils/useSkjulHodefotForMobilVisning';
import { DialogHeader } from './DialogHeader';
import NyDialogForm from './NyDialogForm';
import { useAktivitetId } from '../utils/useAktivitetId';
import { findAktivitet, isLoadingData, useAktivitetContext } from '../AktivitetProvider';

function NyDialog() {
    const kansendeMelding = useKansendeMelding();
    useSkjulHodefotForMobilVisning();

    const aktivitetId = useAktivitetId();
    const aktivitetData = useAktivitetContext();

    const aktivitet = findAktivitet(aktivitetData, aktivitetId);
    const loadingData = isLoadingData(aktivitetData);

    const { viewState, setViewState } = useViewContext();

    useEffect(() => {
        setViewState(endreDialogSomVises());
    }, [setViewState]);

    if (!kansendeMelding || (aktivitetId && loadingData)) {
        return <div className="dialog" />;
    }

    return (
        <div className="dialog">
            <DialogHeader aktivitetId={aktivitet?.id} />
            <NyDialogForm
                onSubmit={() => setViewState(sendtNyDialog(viewState))}
                defaultTema={aktivitet?.tittel}
                aktivitetId={aktivitet?.id}
            />
        </div>
    );
}

export default NyDialog;
