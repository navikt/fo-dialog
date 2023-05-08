import React from 'react';
import { Route, Routes } from 'react-router';

import Dialog from './Dialog';
import DialogInfoMelding from './DialogInfoMelding';
import NyDialog from './NyDialog';

function DialogContainer() {
    return (
        <Routes>
            <Route path={`/ny`} element={<NyDialog />} />
            <Route path={`/:dialogId`} element={<Dialog />} />
            <Route path={`/`} element={<DialogInfoMelding />} />
        </Routes>
    );
}
export default DialogContainer;
