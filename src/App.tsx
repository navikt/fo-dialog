import React, {useEffect, useState} from 'react';

import './App.less';
import {fetchData} from "./utils/fetch";
import {Bruker, DialogData} from "./utils/typer";
import {HenvendelseList} from "./view/HenvendelseList";
import { UserInfoContext} from "./Context";
import {DialogBanner} from "./view/DialogBanner";


import './App.less';
import {DialogOverview} from "./view/DialogOverview";


const App = () => {

    const [dialogListe, setDialogListe] = useState<DialogData[] | undefined>(undefined);

    const [userInfo, setUserInfo] = useState<Bruker | undefined>(undefined);

    useEffect(() => {
        fetchData<DialogData[]>("/veilarbdialog/api/dialog", {method: 'get'})
            .then(res => setDialogListe(res));
        fetchData<Bruker>("/veilarboppfolging/api/oppfolging/me", {method: 'get'})
            .then(res => setUserInfo(res))
    }, []);


    return (<>
            <div className="app">
                <DialogBanner/>
                <UserInfoContext.Provider value={userInfo}>
                {dialogListe === undefined ? null : <DialogOverview dialogData={dialogListe}/>}
                <div className="henvendelseList"> {dialogListe === undefined ? null :
                    <HenvendelseList henvendelseDataList={dialogListe[0].henvendelser}/>}</div>
                </UserInfoContext.Provider>
            </div>

        </>

    );
}


export default App;
