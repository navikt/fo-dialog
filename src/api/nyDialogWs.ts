const PLEASE_URL = 'please.ekstern.dev.nav.no';
const ticketUrl = `/please/ws-auth-ticket`;
const socketUrl = `ws://${PLEASE_URL}/ws`;

enum EventTypes {
    NY_MELDING = 'NY_MELDING'
}

enum ReadyState {
    CONNECTING = 0,
    OPEN = 1,
    CLOSING = 2,
    CLOSED = 3
}

const handleMessage = (callback: () => void) => (event: MessageEvent) => {
    if (event.data === 'AUTHENTICATED') return;
    const message = JSON.parse(event.data);
    if (message !== EventTypes.NY_MELDING) return;
    console.log('Received event', message);
    callback();
};

let socket: WebSocket | undefined = undefined;
export const listenForNyDialogEvents = (callback: () => void, fnr?: string) => {
    // Start with only internal
    if (!fnr) return;
    const body = { fnr };
    if (socket === undefined || ![ReadyState.OPEN, ReadyState.CONNECTING].includes(socket.readyState)) {
        socket = new WebSocket(socketUrl);
    } else {
        console.log('Socket looks good, keep going');
    }

    fetch(ticketUrl, { body: JSON.stringify(body), method: 'POST', headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
            if (!response.ok) throw Error('Failed to fetch ticket for websocket');
            return response.text();
        })
        .then((ticket) => {
            // If ready state is OPEN (1)
            if (socket?.readyState == ReadyState.OPEN) {
                console.log('Websocket already open - sending auth');
                socket.send(ticket);
            } else {
                console.log('Waiting for Websocket to open');
                socket?.addEventListener('open', () => {
                    console.log('Websocket was opened - sending auth');
                    socket?.send(ticket);
                });
            }
            socket?.addEventListener('message', handleMessage(callback));
        });
    return () => {
        console.log('Closing websocket');
        socket?.removeEventListener('message', handleMessage(callback));
        socket?.close();
    };
};
