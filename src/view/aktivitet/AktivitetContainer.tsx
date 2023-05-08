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
    const fnr = useFnrContext();
    const aktivitet = useSelectedAktivitet();
    const location = useLocation();
    return (
        // <div className="col-span-1 border-l border-border-divider h-[calc(100vh-80px)] overflow-y-scroll">
        <Routes>
            <Route
                path={`${fnr ? `/${fnr}` : ''}/ny`}
                element={<div className="border-l border-border-divider"></div>}
            />
            <Route
                path={`${fnr ? `/${fnr}` : ''}/:dialogId`}
                element={
                    aktivitet ? (
                        <div
                            className={classNames(
                                'hidden lg:flex',
                                'w-full max-w-[30rem] border-l border-border-divider overflow-y-hidden'
                            )}
                        >
                            <Aktivitetskort aktivitet={aktivitet} />
                        </div>
                    ) : null
                }
            />
            <Route path={`${fnr ? `/${fnr}` : '/'}`} element={null} />
        </Routes>
    );
}

export default AktivitetContainer;
