import React, {useEffect, useState} from 'react';
import './App.less';
import {fetchData} from "./utils/fetch";
import {DialogData} from "./utils/typer";
import {Dialoger} from "./view/Dialoger";
import {DialogBanner} from "./view/DialogBanner";

const App: React.FC = () => {

    const [dialogListe, setDialogListe] = useState<DialogData[] | undefined>(undefined);

    useEffect(() => {
        fetchData<DialogData[]>("/veilarbdialog/api/dialog", {method: 'get'})
            .then(res => setDialogListe(res))
    }, []);


    return (
        <div className="App">
            <DialogBanner/>
            {dialogListe === undefined ? null : <Dialoger dialogdata={dialogListe}/>}
        </div>
    );
};


export default App;
