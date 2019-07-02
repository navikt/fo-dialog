import FetchMock, {Middleware} from "yet-another-fetch-mock";
import dialoger from "./dialog";
import oppfolging from "./oppfolging";

const loggingMiddleware: Middleware = (request, response) => {
    console.log('response', response);
    return response;
}


const mock = FetchMock.configure({
    enableFallback: false, // default: true
    middleware: loggingMiddleware // default: (req, resp) => resp
});


mock.get("/veilarbdialog/api/dialog", dialoger);

mock.get('/veilarboppfolging/api/oppfolging', oppfolging );