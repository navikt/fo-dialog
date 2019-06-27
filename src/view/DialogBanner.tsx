import React from "react"
import PersonIcon from "./PersonIcon";
import Lenke from 'nav-frontend-lenker';
import { Sidetittel } from "nav-frontend-typografi";

import './DialogBanner.less'

export function DialogBanner () {
    return (
        <div className="dialogBanner">
            <div className="linkPathContainer">
                <div className="PersonIcon">
                    <PersonIcon/>
                </div>
                <nav >
                    <ol className="linkPathList">
                        <li>
                            <Lenke className="linkPathList-item" href="#">Ditt nav</Lenke>
                        </li>
                        <li>
                            <Lenke className="linkPathList-item" href="#">Veien til arbeid</Lenke>
                        </li>
                    </ol>
                </nav>
            </div>
            <Sidetittel className="dialogSideTittel">Dialog med din veileder</Sidetittel>
        </div>
    )
}