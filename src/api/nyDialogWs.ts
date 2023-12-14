const PLEASE_URL = (import.meta.env.VITE_PLEASE_API_URL || '').replace('https://', '');
const ticketUrl = `/please/ws-auth-ticket`;
const socketUrl = `ws://${PLEASE_URL}/ws`;

enum EventTypes {
    NY_MELDING = 'NY_DIALOGMELDING_FRA_BRUKER_TIL_NAV'
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

const maxRetries = 10;
let retries = 0;
const handleClose = (event: CloseEvent) => {
    if (retries >= maxRetries) return;
    retries++;
    socket = new WebSocket(socketUrl);
};

let socket: WebSocket | undefined = undefined;
export const listenForNyDialogEvents = (callback: () => void, fnr?: string) => {
    // Start with only internal
    if (!fnr) return;
    const body = { subscriptionKey: fnr };
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
            if (socket) {
                socket.onmessage = handleMessage(callback);
                socket.onclose = handleClose;
            }
        });
    return () => {
        console.log('Closing websocket');
        if (socket) {
            socket.onclose = () => {};
            socket.close();
        }
    };
};
