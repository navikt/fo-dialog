import React, {useEffect, useState} from 'react';

import {DialogData} from "./utils/typer";
import {fetchData} from "./utils/fetch";
import {DialogOverview} from "./view/DialogOverview";

import './App.css';

const App: React.FC = () => {

    const [dialogListe, setDialogListe] = useState<DialogData[] | undefined>(undefined);
    useEffect(() => {
        fetchData<DialogData[]>("/veilarbdialog/api/dialog", {method: 'get'})
            .then(res => setDialogListe(res))
    }, []);


    return (
        <div className="App">
            { dialogListe === undefined? null : <DialogOverview dialogData={dialogListe}/> }
        </div>
    );
}


export default App;
