import React from 'react';
import { hasData } from '@nutgaard/use-fetch';
import { useDialogContext } from '../Provider';
import InfoVedIngenDialoger from '../InfoVedIngenDialoger';
import { DeviceType } from '../../felleskomponenter/VisibleIfDeviceHoc';
import DialogIkkeValgt from '../DialogIkkeValgt';

export default function DialogInfoMelding() {
    const dialoger = useDialogContext();
    const harDialoger = hasData(dialoger) && dialoger.data.length > 0;

    return (
        <>
            <InfoVedIngenDialoger visible={!harDialoger} visibleFor={[DeviceType.desktop, DeviceType.tablet]} />
            <DialogIkkeValgt visible={harDialoger} visibleFor={[DeviceType.desktop, DeviceType.tablet]} />
        </>
    );
}
