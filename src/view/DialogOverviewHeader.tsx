import React from 'react';
import { visibleIfHoc } from '../component/hoc/visibleIfHoc';
import { Link } from 'react-router-dom';
import { ReactComponent as PlussIkon } from './ikon_pluss.svg';

export function DialogOverviewHeader() {
    return (
        <div className="dialog-overview__header">
            <div className="header-panel">
                <Link className="header-panel__knapp knapp--flat knapp" to={'/ny'}>
                    <PlussIkon />
                    Ny dialog
                </Link>
            </div>
        </div>
    );
}

export const DialogOverviewHeaderVisible = visibleIfHoc(DialogOverviewHeader);
