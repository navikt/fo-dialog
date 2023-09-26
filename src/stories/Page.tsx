import React from 'react';

import '../global.css';

import App from '../App';

const fnr = '1234567890';

interface Props {
    visAktivitet: boolean;
}
export const Page: React.FC<Props> = (props) => {
    return <App visAktivitetDefault={props.visAktivitet} fnr={fnr} key={'1'} />;
};
