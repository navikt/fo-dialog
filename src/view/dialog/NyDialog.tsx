import React, { useEffect } from 'react';
import { useViewContext } from '../Provider';
import useKansendeMelding from '../../utils/UseKanSendeMelding';
import { endreDialogSomVises, sendtNyDialog } from '../ViewState';
import { useSkjulHodefotForMobilVisning } from '../utils/useSkjulHodefotForMobilVisning';
import { DialogHeader } from './DialogHeader';
import NyDialogForm from './NyDialogForm';
import { useAktivitetId } from '../utils/useAktivitetId';
import { findAktivitet, isLoadingData, useAktivitetContext } from '../AktivitetProvider';
import classNames from 'classnames';
import styles from './Dialog.module.less';
import { getDialogTittel } from '../aktivitet/TextUtils';

const cls = classNames(styles.dialog, styles.overflowAuto);

function NyDialog() {
    const kansendeMelding = useKansendeMelding();
    useSkjulHodefotForMobilVisning();

    const aktivitetId = useAktivitetId();
    const aktivitetData = useAktivitetContext();

    const aktivitet = findAktivitet(aktivitetData, aktivitetId);
    const defaultTema = getDialogTittel(aktivitet);
    const loadingData = isLoadingData(aktivitetData);

    const { viewState, setViewState } = useViewContext();

    useEffect(() => {
        setViewState(endreDialogSomVises());
    }, [setViewState]);

    if (!kansendeMelding || (aktivitetId && loadingData)) {
        return <div className={styles.dialog} />;
    }

    return (
        <div className={cls}>
            <DialogHeader aktivitetId={aktivitet?.id} />
            <NyDialogForm
                onSubmit={() => setViewState(sendtNyDialog(viewState))}
                defaultTema={defaultTema}
                aktivitetId={aktivitet?.id}
                key={aktivitet?.id}
            />
        </div>
    );
}

export default NyDialog;
