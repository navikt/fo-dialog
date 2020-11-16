import React, { HTMLAttributes } from 'react';

interface Props {
    hidden: boolean;
}

export function hiddenIfHoc<P>(Component: React.ComponentType<P>) {
    return class WithHiddenIf extends React.Component<P & Props> {
        render() {
            const { hidden, ...props } = this.props;
            return hidden ? null : <Component {...(props as P)} />;
        }
    };
}

function hoc<P>(type: string) {
    return hiddenIfHoc<P>((props) => React.createElement(type, props, props.children));
}

export const div = hoc<HTMLAttributes<HTMLDivElement>>('div');
