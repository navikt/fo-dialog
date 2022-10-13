import React, { ReactElement, useEffect } from 'react';
import { RouteComponentProps, RouteProps, withRouter } from 'react-router-dom';

const ScrollToFocusedOnStart = (props: RouteProps): ReactElement<RouteComponentProps<any>> => {
    useEffect(() => {
        console.log({ props });
    }, [props]);

    useEffect(() => {
        document.activeElement?.scrollIntoView(false);
    }, []);
    return <>{props.children}</>;
};

export default withRouter(ScrollToFocusedOnStart);
