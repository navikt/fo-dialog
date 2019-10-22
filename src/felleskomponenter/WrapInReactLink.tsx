import React, { AnchorHTMLAttributes, HTMLProps } from 'react';
import { Link } from 'react-router-dom';

function WrapInReactLink(props: HTMLProps<HTMLElement>) {
    const innerProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return <Link to={innerProps.href!} {...innerProps} />;
}

export default WrapInReactLink;
