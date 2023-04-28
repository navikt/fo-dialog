import React from 'react';
import { Route, Routes } from 'react-router';

import { useFnrContext } from '../Provider';
import Dialog from './Dialog';
import DialogInfoMelding from './DialogInfoMelding';
import NyDialog from './NyDialog';

function DialogContainer() {
    const fnr = useFnrContext();

    return (
        <Routes>
            <Route path={`${fnr ? `/${fnr}` : ''}/ny`} element={<NyDialog />} />
            <Route path={`${fnr ? `/${fnr}` : ''}/:dialogId`} element={<Dialog />} />
            <Route path={`${fnr ? `/${fnr}` : '/'}`} element={<DialogInfoMelding />} />
        </Routes>
    );
}
export default DialogContainer;
