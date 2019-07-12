import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {fetchData} from "./utils/fetch";
import { Provider} from "./Context";
import {DialogBanner} from "./view/DialogBanner";
import {Bruker, DialogData} from "./utils/typer";
import {DialogOverview} from "./view/DialogOverview";

import Dialog from "./view/Dialog";
import {AlertStripeContainer} from "./view/AlertStripeContainer";
import NavFrontendSpinner from "nav-frontend-spinner";

import './App.less';


function NyTest() { // Stand-in for NyDialog-komponenten
    return <h1>LAG NY DIALOG</h1>;
}

function App() {
    const [dialogListe, setDialogListe] = useState<DialogData[] | undefined>(undefined);
    const [userInfo, setUserInfo] = useState<Bruker | undefined>(undefined);

    useEffect(() => {
        fetchData<DialogData[]>("/veilarbdialog/api/dialog", {method: 'get'})
            .then(res => setDialogListe(res));
        fetchData<Bruker>("/veilarboppfolging/api/oppfolging/me", {method: 'get'})
            .then(res => setUserInfo(res))

    }, []);

    if (dialogListe === undefined || userInfo === undefined) {
        return <NavFrontendSpinner className="app__spinner"/>
    }

    return (
        <Router>
            <div className="app">
                <DialogBanner/>
                <Provider>
                    <AlertStripeContainer/>
                    <div className="app__body app__body--dialogvisning">
                        <DialogOverview dialogData={dialogListe}/>
                        <Switch>
                            <Route exact path="/" component={() => <Dialog dialogData={dialogListe}/>}/>
                            <Route path="/ny" component={NyTest}/>
                            <Route path="/:dialogId" component={() => <Dialog dialogData={dialogListe}/>}/>
                        </Switch>
                    </div>
                </Provider>
            </div>
        </Router>
    );
}

export default App;
