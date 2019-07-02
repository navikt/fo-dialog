import React, {useEffect, useState} from 'react';

import './App.less';
import {fetchData} from "./utils/fetch";
import {Bruker, DialogData} from "./utils/typer";

import './App.less';
import {DialogOverview} from "./view/DialogOverview";
import {Dialog} from "./view/Dialog";
import {DialogBanner} from "./view/DialogBanner";
import { UserInfoContext} from "./Context";

const App = () => {

    const [dialogListe, setDialogListe] = useState<DialogData[] | undefined>(undefined);
    const [userInfo, setUserInfo] = useState<Bruker | undefined>(undefined);

    useEffect(() => {
        fetchData<DialogData[]>("/veilarbdialog/api/dialog", {method: 'get'})
            .then(res => setDialogListe(res));
        fetchData<Bruker>("/veilarboppfolging/api/oppfolging/me", {method: 'get'})
            .then(res => setUserInfo(res))

    }, []);


    return (
        <>
            <div className="app">
                <DialogBanner/>
                <UserInfoContext.Provider value={userInfo}>
                    <div className="App-body">
                        <div className="dialog-list">
                            { dialogListe === undefined? null : <DialogOverview dialogData={dialogListe}/> }
                        </div>
                        <div className="dialog-detail">
                            { dialogListe === undefined ? null : <Dialog dialog={dialogListe[3]}/> }
                        </div>
                    </div>
                </UserInfoContext.Provider>

            </div>

        </>

    );
};


export default App;
