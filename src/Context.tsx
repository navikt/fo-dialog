import React, {useEffect, useState} from "react";
import {Bruker, OppfolgingData} from "./utils/typer";
import {fetchData} from "./utils/fetch";
import NavFrontendSpinner from "nav-frontend-spinner";


enum FetchStatusData {
    LOADING,
    DONE,
}

export const UserInfoContext = React.createContext<Bruker| undefined>(undefined);

export const OppfolgingContext = React.createContext<OppfolgingData|undefined>(undefined);

interface ProviderData {
    children: React.ReactNode;
}

export function Provider(props: ProviderData){

    const [userInfo, setUserInfo] = useState<Bruker | undefined>(undefined);
    const [oppfolgingData, setOppfolgingData] = useState<OppfolgingData |undefined>(undefined);
    const [fetchStatusMe, setFetchStatusMe] = useState<FetchStatusData>(FetchStatusData.LOADING);
    const [fetchStatusOppf, setFetchStatusOppf] = useState<FetchStatusData>(FetchStatusData.LOADING);

    useEffect(() => {
        fetchData<Bruker>("/veilarboppfolging/api/oppfolging/me", {method: 'get'})
            .then(res => setUserInfo(res))
            .then( () => setFetchStatusMe(FetchStatusData.DONE));

        fetchData<OppfolgingData>("/veilarboppfolging/api/oppfolging", {method: 'get'})
            .then(res => setOppfolgingData(res))
            .then(() => setFetchStatusOppf(FetchStatusData.DONE));
        }, [] );

    if (fetchStatusMe === FetchStatusData.LOADING || fetchStatusOppf === FetchStatusData.LOADING){
        return(
            <NavFrontendSpinner/>
        )
    }
    return(
        <OppfolgingContext.Provider value={oppfolgingData}>
            <UserInfoContext.Provider value={userInfo}>
                {props.children}
            </UserInfoContext.Provider>
        </OppfolgingContext.Provider>
    )
}