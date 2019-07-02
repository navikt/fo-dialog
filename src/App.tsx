import React, {useEffect, useState} from 'react';
import './App.less';
import {fetchData} from "./utils/fetch";
import {DialogData, OppfolgingData} from "./utils/typer";
import {Dialoger} from "./view/Dialoger";
import {HenvendelseList} from "./view/HenvendelseList";
import {DialogBanner} from "./view/DialogBanner";

import './App.less';
import oppf from "./mock/oppfolging";

const App: React.FC = () => {

    const [dialogListe, setDialogListe] = useState<DialogData[] | undefined>(undefined);


    useEffect(() => {
        fetchData<DialogData[]>("/veilarbdialog/api/dialog", {method: 'get'})
            .then(res => setDialogListe(res))
    }, []);

    const erBrukerUnderOppf = oppf.oppfolgingsPerioder.length > 0;
    const OppfolgingContext = React.createContext<OppfolgingData|undefined>(undefined);

    return (
        <div className="app">
            <OppfolgingContext.Provider value={oppf}>
                <DialogBanner/>
                { dialogListe === undefined? null : <Dialoger dialogdata={dialogListe}/> }
                <div className="henvendelseList"> {dialogListe === undefined? null :<HenvendelseList henvendelseDataList={dialogListe[0].henvendelser}/>}</div>
            </OppfolgingContext.Provider>
        </div>
    );
};


export default App;
