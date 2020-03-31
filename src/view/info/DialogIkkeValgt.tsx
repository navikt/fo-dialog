import styles from './DialogIkkeValgt.module.less';
import { ReactComponent as IngenValgteDialoger } from '../dialog/ingen-valgt.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import classNames from 'classnames';

interface Props {
    className: string;
}

function Svg(props: { title: string }) {
    // @ts-ignore
    return <IngenValgteDialoger title={props.title} />;
}

function DialogIkkeValgt(props: Props) {
    return (
        <div className={classNames(props.className, styles.dialogIkkeValgt)}>
            <Svg title="Ingen dialog valgt" />
            <Normaltekst>Velg en dialog for å lese den</Normaltekst>
        </div>
    );
}

export default visibleIfHoc(DialogIkkeValgt);
