import React, {useEffect, useState} from 'react';
import './App.less';
import {fetchData} from "./utils/fetch";
import {DialogData} from "./utils/typer";
import {Dialoger} from "./view/Dialoger";
import {HenvendelseList} from "./view/HenvendelseList";

const App: React.FC = () => {

    const [dialogListe, setDialogListe] = useState<DialogData[] | undefined>(undefined);

    useEffect(() => {
        fetchData<DialogData[]>("/veilarbdialog/api/dialog", {method: 'get'})
            .then(res => setDialogListe(res))
    }, []);


    return (
        <div className="App">
            { dialogListe === undefined? null : <Dialoger dialogdata={dialogListe}/> }
            <div style={{backgroundColor: "#e9e7e7"}}> {dialogListe === undefined? null :<HenvendelseList henvendelseDataList={dialogListe[0].henvendelser}/>}</div>
        </div>
    );
}


export default App;
