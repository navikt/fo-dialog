import React, {useEffect, useState} from 'react';
import {fetchData} from "./utils/fetch";
import { Provider} from "./Context";
import {DialogBanner} from "./view/DialogBanner";
import {DialogData} from "./utils/typer";
import {DialogOverview} from "./view/DialogOverview";
import {Dialog} from "./view/Dialog";
import {AlertStripeContainer} from "./view/AlertStripeContainer";

import './App.less';
import {Aktivitetskort} from "./view/Aktivitetskort";

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
                    <div className="app__body app__body--dialogvisning">
                        { dialogListe === undefined? null : <DialogOverview dialogData={dialogListe}/> }
                        { dialogListe === undefined ? null : <Dialog dialog={dialogListe[0]}/> }
                        { dialogListe === undefined ? null : <Aktivitetskort dialog={dialogListe[3]}/> }
                    </div>
                </Provider>
            </div>

        </>

    );
};


export default App;
