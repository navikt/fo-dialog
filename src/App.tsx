import React, { useEffect, useState} from 'react';
import './App.less';
import {fetchData} from "./utils/fetch";
import {Bruker, DialogData} from "./utils/typer";
import {HenvendelseList} from "./view/HenvendelseList";
import { UserInfoContext, OppfolgingContext} from "./Context";
import {DialogBanner} from "./view/DialogBanner";
import {DialogOverview} from "./view/DialogOverview";
import oppfolgingData from "./mock/oppfolging";
import {AlertStripeContainer} from "./view/AlertStripeContainer";

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

    return (<>
            <div className="app">
                <DialogBanner/>
                <OppfolgingContext.Provider value={oppfolgingData}>
                    <UserInfoContext.Provider value={userInfo}>
                        <AlertStripeContainer/>
                        {dialogListe === undefined ? null : <DialogOverview dialogData={dialogListe} visible={oppfolgingData.underOppfolging}/>}
                        <div className="henvendelseList"> {dialogListe === undefined ? null :
                            <HenvendelseList henvendelseDataList={dialogListe[0].henvendelser}/>}</div>
                    </UserInfoContext.Provider>
                </OppfolgingContext.Provider>
            </div>
        </>
    );
};


export default App;
