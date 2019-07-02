import React from "react";

import {DialogData} from "../utils/typer";
import {DialogPreview} from "./DialogPreview";
import {DialogOverviewHeader} from "./DialogOverviewHeader";
import {visibleIfHoc} from "../component/hoc/visibleIfHoc";
import { defaultProps } from 'recompose';

import "./dialogoverview.less"

interface Props {
    dialogData: DialogData[];
}

function DialogOverviewRaw(props: Props){

    return <div className="dialog-overview">
        <DialogOverviewHeader/>
        <div className="dialog-overview__preview-list">
            {props.dialogData.map((dialog) => <DialogPreview dialog={dialog} key={dialog.id}/>)}
        </div>
    </div>
}

const withDefualtProps = defaultProps({visible: true});
export const DialogOverview = withDefualtProps(visibleIfHoc(DialogOverviewRaw));
