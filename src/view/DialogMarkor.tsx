import React, { useState } from 'react';
import { Checkbox } from 'nav-frontend-skjema';
import { DialogData } from '../utils/typer';
import { fetchData } from '../utils/fetch';

interface Props {
    dialog: DialogData;
}

export function DialogMarkor(props: Props) {
    const [ferdigBehandlet, setFerdigbehandlet] = useState(props.dialog.ferdigBehandlet);
    const [venterPaSvar, setVenterPaSvar] = useState(props.dialog.venterPaSvar);

    const toggleFerdigBehandlet = () => {
        setFerdigbehandlet(!ferdigBehandlet);
        fetchData<DialogData>('/veilarbdialog/api/dialog/:dialogId/ferdigbehandlet/:bool', {
            method: 'put',
            body: JSON.stringify({ dialogId: props.dialog.id, ferdigBehandlet: ferdigBehandlet })
        });
    };
    const toggleVenterPaSvar = () => {
        setVenterPaSvar(!venterPaSvar);
        fetchData<DialogData>('/veilarbdialog/api/dialog/:dialogId/ferdigbehandlet/:bool', {
            method: 'put',
            body: JSON.stringify({ dialogId: props.dialog.id, venterPaSvar: venterPaSvar })
        });
    };

    return (
        <div className="checkbox-block">
            <Checkbox
                label="Venter på svar fra NAV"
                checked={!ferdigBehandlet}
                className="checkbox-block__item"
                onChange={() => toggleFerdigBehandlet()}
            />
            <Checkbox
                label="Venter på svar fra bruker"
                checked={venterPaSvar}
                className="checkbox-block__item"
                onChange={toggleVenterPaSvar}
            />
        </div>
    );
}
