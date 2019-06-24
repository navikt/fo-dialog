import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {fetchData} from "./utils/fetch";
import {DialogData} from "./utils/typer";
import dialoger from "./mock/dialog";
import {Dialoger} from "./view/Dialoger";

const App: React.FC = () => {

    const [dialogListe, setDialogListe] = useState<DialogData[] | undefined>(undefined);

    useEffect(() => {
        fetchData<DialogData[]>("/veilarbdialog/api/dialog", {method: 'get'})
            .then(res => setDialogListe(res))
    }, []);


    return (
        <div className="App">
            { dialogListe === undefined? null : <Dialoger dialogdata={dialogListe}/> }
        </div>
    );
}


export default App;
