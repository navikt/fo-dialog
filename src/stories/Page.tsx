import React from 'react';

import '../global.css';

import App from '../App';

type User = {
    name: string;
};

const fnr = '1234567890';
export const Page: React.FC = () => {
    return <App fnr={fnr} key={'1'} />;
};
