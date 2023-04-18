import { useFnrContext } from './view/Provider';

const dialogRoute = (fnr?: string) => (id: string) => fnr ? `/${fnr}/${id}` : `/${id}`;
const nyRoute = (fnr?: string) => () => fnr ? `/${fnr}/ny` : `/ny`;
const baseRoute = (fnr?: string) => () => fnr ? `/${fnr}` : `/`;
const informasjonRoute = (fnr?: string) => () => fnr ? `/${fnr}/informasjon` : `/informasjon`;

export const useRoutes = () => {
    const fnr = useFnrContext();
    return {
        baseRoute: baseRoute(fnr),
        dialogRoute: dialogRoute(fnr),
        nyRoute: nyRoute(fnr),
        informasjonRoute: informasjonRoute(fnr)
    };
};
