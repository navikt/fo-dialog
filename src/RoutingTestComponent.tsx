import React, {FC} from "react";
import {match, withRouter} from "react-router";
import {RouteComponentProps} from "react-router";

type TParams = { dialogId: string  };

function RoutingTestComponent( props : RouteComponentProps<TParams>) {
    console.log('tester', props);
    return (<>
        {props.match.params.dialogId}
        </>)
}

export default withRouter(RoutingTestComponent);