import React from 'react';
import { Route, Routes } from 'react-router';

import { useFnrContext } from '../Provider';
import DialogOversikt from './DialogOversikt';

export default function DialogOversiktContainer() {
    const fnr = useFnrContext();
    return (
        <Routes>
            <Route path={`${fnr ? `/${fnr}` : ''}/:dialogId?`} element={<DialogOversikt />} />
        </Routes>
    );
}
