import React, {useEffect, useState} from 'react';
import {fetchData} from "./utils/fetch";
import {Bruker, DialogData} from "./utils/typer";
import {DialogOverview} from "./view/DialogOverview";
import {Dialog} from "./view/Dialog";
import {DialogBanner} from "./view/DialogBanner";
import { UserInfoContext} from "./Context";

import './App.less';

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
                    <div className="app__body">
                        { dialogListe === undefined? null : <DialogOverview dialogData={dialogListe}/> }
                        { dialogListe === undefined ? null : <Dialog dialog={dialogListe[1]}/> }
                    </div>
                </UserInfoContext.Provider>

            </div>

        </>

    );
};


export default App;
