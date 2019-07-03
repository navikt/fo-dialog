import React, { useEffect, useState} from 'react';
import './App.less';
import {fetchData} from "./utils/fetch";
import { DialogData } from "./utils/typer";
import {HenvendelseList} from "./view/HenvendelseList";
import { Provider} from "./Context";
import {DialogBanner} from "./view/DialogBanner";
import {DialogOverview} from "./view/DialogOverview";
import {AlertStripeContainer} from "./view/AlertStripeContainer";

import './App.less';


const App = () => {

    const [dialogListe, setDialogListe] = useState<DialogData[] | undefined>(undefined);

    useEffect(() => {
        fetchData<DialogData[]>("/veilarbdialog/api/dialog", {method: 'get'})
            .then(res => setDialogListe(res));
    }, []);
    return (<>
            <div className="app">
                <DialogBanner/>
                <Provider>
                    <AlertStripeContainer/>
                    {dialogListe === undefined ? null : <DialogOverview dialogData={dialogListe} />}
                    <div className="henvendelseList"> {dialogListe === undefined ? null :
                        <HenvendelseList henvendelseDataList={dialogListe[0].henvendelser}/>}</div>
                </Provider>
            </div>
        </>
    );
};


export default App;
