import React, {FC} from "react";
import {match} from "react-router";
import {RouteComponentProps} from "react-router";

type TParams = { id: string  };

function RoutingTestComponent( match : RouteComponentProps<TParams>) {
    return (<>
        {match.match.params.id}
        </>)
}

export default RoutingTestComponent;