const aktivitetQuery = (aktivitetId?: string) => (aktivitetId ? `?aktivitetId=${aktivitetId}` : '');

const baseRoute = () => '/';
const dialogRoute = (id: string) => `/${id}`;
const nyRoute = (aktivitetId: string | undefined = undefined) => `/ny${aktivitetQuery(aktivitetId)}`;
const informasjonRoute = () => '/informasjon';

export const useRoutes = () => {
    return {
        baseRoute,
        dialogRoute,
        nyRoute,
        informasjonRoute
    };
};
