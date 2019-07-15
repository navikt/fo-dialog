import React from 'react';

interface VisibleIfHocProps {
    visible: boolean;
}

export function visibleIfHoc<P>(Component: React.ComponentType<P>) {
    return class WithVisibleIf extends React.Component<P & VisibleIfHocProps> {
        render() {
            const { visible, ...props } = this.props;
            return visible ? <Component {...(props as P)} /> : null;
        }
    };
}
