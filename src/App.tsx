import React, {useEffect, useState} from 'react';
import './App.less';
import {fetchData} from "./utils/fetch";
import {Bruker, DialogData} from "./utils/typer";
import {Dialoger} from "./view/Dialoger";
import {HenvendelseList} from "./view/HenvendelseList";

import './App.less';

const App: React.FC = () => {

    const [dialogListe, setDialogListe] = useState<DialogData[] | undefined>(undefined);
    const [userInfo, setUserInfo] = useState<Bruker | undefined>(undefined);
    

    useEffect(() => {
        fetchData<DialogData[]>("/veilarbdialog/api/dialog", {method: 'get'})
            .then(res => setDialogListe(res))
    }, []);
    useEffect(() => {
        fetchData<Bruker>("/brukeridentifikasjon/api/id", {method: 'get'})
            .then(res => setUserInfo(res))
    }, [] );


    return (
        <div className="app">
            <div>
            { userInfo === undefined ? null: (userInfo.erVeileder) ? "Innlogget som veileder" : "Innlogget som bruker"}
            </div>
            { dialogListe === undefined? null : <Dialoger dialogdata={dialogListe}/> }
            <div className="henvendelseList"> {dialogListe === undefined? null :<HenvendelseList henvendelseDataList={dialogListe[0].henvendelser}/>}</div>
        </div>
    );
};


export default App;
