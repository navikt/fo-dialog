import React from "react";
import {Bruker, OppfolgingData} from "./utils/typer";


export const UserInfoContext = React.createContext<Bruker| undefined>(undefined);

export const OppfolgingContext = React.createContext<OppfolgingData|undefined>(undefined);