import React, { useEffect, useState } from 'react';

export enum DeviceType {
    mobile,
    tablet,
    desktop
}

interface PropTypes {
    visibleFor: DeviceType[];
}

export function VisibleIfDeviceHoc<P>(Component: React.ComponentType<P>) {
    return function WithVisibleIfDevice(props: PropTypes & P) {
        const getCurrentDevice = () => {
            if (window.innerWidth <= 800) return DeviceType.mobile;
            else if (window.innerWidth <= 1200) return DeviceType.tablet;
            return DeviceType.desktop;
        };

        const [device, setDevice] = useState(getCurrentDevice());

        const handleWindowResize = () => {
            setDevice(getCurrentDevice());
        };

        useEffect(() => {
            window.addEventListener('resize', handleWindowResize);
            return () => {
                window.removeEventListener('resize', handleWindowResize);
            };
        }, [device]);

        return props.visibleFor.includes(device) ? <Component {...(props as P)} /> : null;
    };
}
