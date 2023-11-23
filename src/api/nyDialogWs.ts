import { fetchData } from '../utils/Fetch';

const dialogvarslerUrl = 'dialogvarsler.ekstern.dev.nav.no';
const ticketUrl = `/dialogvarsler/ws-auth-ticket`;
const socketUrl = `ws://${dialogvarslerUrl}/ws`;

enum EventTypes {
    NY_MELDING = 'NY_MELDING'
}

enum ReadyState {
    CONNECTING = 0,
    OPEN = 1,
    CLOSING = 2,
    CLOSED = 3
}

export const listenForNyDialogEvents = (callback: () => void, fnr?: string) => {
    // Start with only internal
    if (!fnr) return;
    const body = { fnr };
    const socket = new WebSocket(socketUrl);

    fetch(ticketUrl, { body: JSON.stringify(body), method: 'POST', headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
            if (!response.ok) throw Error('Failed to fetch ticket for websocket');
            return response.text();
        })
        .then((ticket) => {
            // If ready state is OPEN (1)
            if (socket.readyState == ReadyState.OPEN) {
                socket.send(ticket);
            } else {
                socket.addEventListener('open', () => {
                    socket.send(ticket);
                });
            }
            socket.addEventListener('message', (event) => {
                if (event.data !== EventTypes.NY_MELDING) return;
                callback();
            });
        });
    return () => {
        socket.close();
    };
};
