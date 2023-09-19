import React, { useContext, useState } from 'react';

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

export const AktivitetToggleProvider = (props: { children: React.ReactNode }) => {
    const [visAktivitet, setVisAktivitet] = useState(false);
    return (
        <AktivitetToggleContext.Provider value={{ visAktivitet, setVisAktivitet }}>
            {props.children}
        </AktivitetToggleContext.Provider>
    );
};
