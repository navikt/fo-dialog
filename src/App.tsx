import React, { useEffect, useState} from 'react';
import {fetchData} from "./utils/fetch";
import { Provider} from "./Context";
import {DialogBanner} from "./view/DialogBanner";
import {Bruker, DialogData} from "./utils/typer";
import {DialogOverview} from "./view/DialogOverview";


import './App.less';

import {Dialog} from "./view/Dialog";
import {AlertStripeContainer} from "./view/AlertStripeContainer";


const App = () => {

    const [dialogListe, setDialogListe] = useState<DialogData[] | undefined>(undefined);

    useEffect(() => {
        fetchData<DialogData[]>("/veilarbdialog/api/dialog", {method: 'get'})
            .then(res => setDialogListe(res));
    }, []);

    return (
        <>
            <div className="app">
                <DialogBanner/>
                <Provider>
                    <AlertStripeContainer/>
                    <div className="App-body">
                        <div className="dialog-list">
                            {dialogListe === undefined ? null : <DialogOverview dialogData={dialogListe} />}
                        </div>
                        <div className="dialog-detail">
                            {dialogListe === undefined ? null : <Dialog dialog={dialogListe[3]}/>}
                        </div>
                    </div>
                </Provider>
            </div>
        </>
    );
};

export default App;
