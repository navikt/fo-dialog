import React, {useEffect, useState} from 'react';

import {DialogData} from "./utils/typer";
import {fetchData} from "./utils/fetch";
import {DialogOverview} from "./view/DialogOverview";
import {HenvendelseList} from "./view/HenvendelseList";
import {Dialoger} from "./view/Dialoger";

import './App.less';

const App: React.FC = () => {

    const [dialogListe, setDialogListe] = useState<DialogData[] | undefined>(undefined);
    useEffect(() => {
        fetchData<DialogData[]>("/veilarbdialog/api/dialog", {method: 'get'})
            .then(res => setDialogListe(res))
    }, []);


    return (<>
            <div className="App">
                {dialogListe === undefined ? null : <DialogOverview dialogData={dialogListe}/>}
            </div>
            <div className="app">
                {dialogListe === undefined ? null : <Dialoger dialogdata={dialogListe}/>}
                <div className="henvendelseList"> {dialogListe === undefined ? null :
                    <HenvendelseList henvendelseDataList={dialogListe[0].henvendelser}/>}</div>
            </div>

        </>

    );
}


export default App;
