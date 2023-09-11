import { fetchData } from '../utils/Fetch';

const dialogvarslerUrl = 'dialogvarsler.ekstern.dev.nav.no';
const ticketUrl = `https://${dialogvarslerUrl}/ws-auth-ticket`;
const socketUrl = `ws://${dialogvarslerUrl}/ws-auth-ticket`;

enum EventTypes {
    NY_MELDING = 'NY_MELDING'
}

export const listenForNyDialogEvents = (callback: () => void, fnr?: string) => {
    // Start with only internal
    if (!fnr) return;
    const body = { fnr };
    const socket = new WebSocket(socketUrl);
    fetchData<string>(ticketUrl, { body: JSON.stringify(body), method: 'POST' }).then((ticket) => {
        socket.send(ticket);
        socket.addEventListener('message', (event) => {
            if (event.data !== EventTypes.NY_MELDING) return;
            callback();
        });
    });
    return () => {
        socket.close();
    };
};
