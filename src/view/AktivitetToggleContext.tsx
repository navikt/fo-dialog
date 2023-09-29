import React, { useContext, useEffect, useMemo, useState } from 'react';

interface AktivitetToggleState {
    visAktivitet: boolean;
    setVisAktivitet: (visAktivitet: boolean) => void;
}
export const AktivitetToggleContext = React.createContext<AktivitetToggleState>({
    visAktivitet: true,
    setVisAktivitet: () => {}
});
export const useVisAktivitetContext = () => useContext(AktivitetToggleContext);
export const useVisAktivitet = () => useContext(AktivitetToggleContext).visAktivitet;

export const AktivitetToggleProvider = ({
    children,
    defaultValue
}: {
    children: React.ReactNode;
    defaultValue: boolean;
}) => {
    const [visAktivitet, setVisAktivitet] = useState(defaultValue);
    useEffect(() => {
        if (defaultValue === false || defaultValue === true) setVisAktivitet(defaultValue);
    }, [defaultValue]);
    const context = useMemo(() => {
        return { visAktivitet, setVisAktivitet };
    }, [visAktivitet, defaultValue]);
    return <AktivitetToggleContext.Provider value={context}>{children}</AktivitetToggleContext.Provider>;
};
