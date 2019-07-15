import React from "react";
import Snakkeboble from "nav-frontend-snakkeboble";
import { HenvendelseData } from "../utils/typer";
import { formaterHenvendelseDate } from "../utils/date";
import { Normaltekst } from "nav-frontend-typografi";

import "./henvendelse.less";

interface Props {
  henvendelseData: HenvendelseData;
}

export function Henvendelse(props: Props) {
  const erMeldingFraBruker: boolean =
    props.henvendelseData.avsender === "BRUKER";
  const date: string = formaterHenvendelseDate(props.henvendelseData.sendt);
  const className: string = erMeldingFraBruker
    ? "ikon bruker-ikon"
    : "ikon veileder-ikon";
  return (
    <Snakkeboble
      topp={date}
      pilHoyre={erMeldingFraBruker}
      ikonClass={className}
    >
      <Normaltekst>{props.henvendelseData.tekst}</Normaltekst>
    </Snakkeboble>
  );
}
