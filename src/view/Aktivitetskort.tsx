import React from 'react';
import {Aktivitet, DialogData} from '../utils/typer';
import {EtikettLiten, Innholdstittel, Normaltekst} from 'nav-frontend-typografi';
import useFetch from "../utils/use-fetch";
import {formaterDateAndTime} from "../utils/date";
import Lenke from "nav-frontend-lenker";
import {HoyreChevron} from "nav-frontend-chevron";
import {AktivitetskortInfoBox} from "./AktivitetskortInfoBox";

interface Props {
    dialog: DialogData;
}

export function Aktivitetskort(props: Props) {

    const aktiviteter = useFetch<Aktivitet[]>('/veilarbaktivitet/api/aktivitet');

    if (aktiviteter.data !== null) {

        const aktivitet = aktiviteter.data.find((aktivitet) => (aktivitet.id === props.dialog.aktivitetId));
        const datoString = !!props.dialog.sisteDato ? formaterDateAndTime(props.dialog.sisteDato).substring(0,10) : '';

        if (aktivitet) {
            return (
                <div className="aktivitetkort">
                    <EtikettLiten> aktivitet / {aktivitet.status} / {mapAktivitetsTypeToHumanReadableString(aktivitet.type)}</EtikettLiten>
                    <Innholdstittel>{aktivitet.stillingsTittel}</Innholdstittel>
                    <Lenke href={"temp"}>
                        Les mer i aktivitetsplanen
                        <HoyreChevron/>
                    </Lenke>
                    <AktivitetskortInfoBox aktivitet={aktivitet}/>
                </div>
            );
        }
    }
    return null;
}

function mapAktivitetsTypeToHumanReadableString(type : string){

    switch (type) {
        case "MOTE": return "Møte";
        case "STILLING": return "Stilling";
        case "SOKEAVTALE": return "Jobbsøking";
        case "SAMTALEREFERAT": return "Samtalereferat"
        case "BEHANDLING": return "Behandling"
        case "EGEN": return "Egenaktivitet"
        case "IJOBB": return "Nåværende stilling"//TODO: Bør kanskje finne et kortere alternativ til dette
    }
    return ""
}