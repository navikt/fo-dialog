import React, {useEffect, useState} from 'react';
import './App.less';
import {fetchData} from "./utils/fetch";
import {Bruker, DialogData} from "./utils/typer";
import {Dialoger} from "./view/Dialoger";
import {HenvendelseList} from "./view/HenvendelseList";
import { UserInfoContext} from "./Context";
import {DialogBanner} from "./view/DialogBanner";

import './App.less';


const App: React.FC = () => {

    const [dialogListe, setDialogListe] = useState<DialogData[] | undefined>(undefined);
    const [userInfo, setUserInfo] = useState<Bruker | undefined>(undefined);


    useEffect(() => {
        fetchData<DialogData[]>("/veilarbdialog/api/dialog", {method: 'get'})
            .then(res => setDialogListe(res))
    }, []);
    useEffect(() => {
        fetchData<Bruker>("/veilarboppfolging/api/oppfolging/me", {method: 'get'})
            .then(res => setUserInfo(res))
    }, [] );


    return (
        <div className="app">
          <DialogBanner/>
            <UserInfoContext.Provider value={userInfo}>
                { dialogListe === undefined? null : <Dialoger dialogdata={dialogListe}/> }
                <div className="henvendelseList"> {dialogListe === undefined? null :<HenvendelseList henvendelseDataList={dialogListe[0].henvendelser}/>}</div>
            </UserInfoContext.Provider>
        </div>
    );
};


export default App;
