import React from 'react';

const AppWebComponent = ({ fnr }: { fnr: string }) => {
    return React.createElement('dab-dialog', {
        // eslint-disable-next-line
        ['data-fnr']: fnr
    });
};

export default AppWebComponent;
