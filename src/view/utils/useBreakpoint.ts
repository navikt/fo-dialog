import { useEffect, useState } from 'react';

export enum Breakpoint {
    initial = 0,
    sm = 480,
    md = 768,
    lg = 1024,
    xl = 1280,
    '2xl' = 1920
}

const getBreakpoint = (): Breakpoint => {
    const { innerWidth: width } = window;
    if (Breakpoint.initial <= width && width < Breakpoint.sm) {
        return Breakpoint.initial;
    }
    if (Breakpoint.sm < width && width < Breakpoint.md) {
        return Breakpoint.sm;
    }
    if (Breakpoint.md < width && width < Breakpoint.lg) {
        return Breakpoint.md;
    }
    if (Breakpoint.lg < width && width < Breakpoint.xl) {
        return Breakpoint.lg;
    }
    if (Breakpoint.xl < width && width < Breakpoint['2xl']) {
        return Breakpoint.xl;
    }
    return Breakpoint['2xl'];
};

export const useBreakpoint = (): Breakpoint => {
    const [breakpoint, setBreakPoint] = useState(() => getBreakpoint());
    const handleResize = () => {
        setBreakPoint(getBreakpoint());
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return breakpoint;
};
