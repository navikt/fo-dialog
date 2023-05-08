import classNames from 'classnames';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router';

import Dialog from '../dialog/Dialog';
import DialogInfoMelding from '../dialog/DialogInfoMelding';
import NyDialog from '../dialog/NyDialog';
import { useFnrContext } from '../Provider';
import { useSelectedAktivitet } from '../utils/useAktivitetId';
import { Aktivitetskort } from './Aktivitetskort';

function AktivitetContainer() {
    return (
        <Routes>
            <Route path={`/ny`} element={<div className="border-l border-border-divider"></div>} />
            <Route path={`/:dialogId`} element={<Aktivitetskort />} />
            <Route path={`/`} element={null} />
        </Routes>
    );
}

export default AktivitetContainer;
