import { v4 as uuidv4 } from 'uuid';

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

interface SubscriptionPayload {
    subscriptionKey: string;
}

let socketSingleton: WebSocket | undefined = undefined;
let ticketSingleton: string | undefined;

const handleMessage = (callback: () => void, body: SubscriptionPayload) => (event: MessageEvent) => {
    if (event.data === 'AUTHENTICATED') return;
    if (event.data === 'INVALID_TOKEN' && socketSingleton) {
        ticketSingleton = undefined;
        authorize(socketSingleton, body, callback);
        return;
    }
    const message = JSON.parse(event.data);
    if (message !== EventTypes.NY_MELDING) return;
    console.log('Received event', message);
    callback();
};

const maxRetries = 10;
let retries = 0;
const handleClose = (body: SubscriptionPayload, callback: () => void) => (event: CloseEvent) => {
    if (retries >= maxRetries) return;
    retries++;
    setTimeout(() => {
        socketSingleton?.close();
        socketSingleton = new WebSocket(socketUrl);
        authorize(socketSingleton, body, callback);
    }, 1000);
};

const sendTicketWhenOpen = (socket: WebSocket, ticket: string) => {
    const sendTicket = () => socket.send(ticket);
    if (socket?.readyState === ReadyState.OPEN) {
        console.log('Websocket already open - sending auth');
        sendTicket();
    } else {
        console.log('Websocket was opened - sending auth');
        socket.onopen = sendTicket;
    }
};

const authorize = (socket: WebSocket, body: SubscriptionPayload, callback: () => void) => {
    if (ticketSingleton) {
        sendTicketWhenOpen(socket, ticketSingleton);
    }
    fetch(ticketUrl, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'text/plain',
            'Nav-Consumer-Id': 'aktivitetsplan',
            'Nav-Call-Id': uuidv4()
        }
    })
        .then((response) => {
            if (!response.ok) throw Error('Failed to fetch ticket for websocket');
            return response.text();
        })
        .then((ticket) => {
            ticketSingleton = ticket;
            sendTicketWhenOpen(socket, ticket);
            socket.onmessage = handleMessage(callback, body);
            socket.onclose = handleClose(body, callback);
        });
};

export const listenForNyDialogEvents = (callback: () => void, fnr?: string) => {
    // Start with only internal
    if (!fnr) return;
    const body = { subscriptionKey: fnr };
    if (
        socketSingleton === undefined ||
        ![ReadyState.OPEN, ReadyState.CONNECTING].includes(socketSingleton.readyState)
    ) {
        socketSingleton = new WebSocket(socketUrl);
        ticketSingleton = undefined;
        authorize(socketSingleton, body, callback);
    } else {
        console.log('Socket looks good, keep going');
    }
    return () => {
        console.log('Closing websocket');
        if (socketSingleton) {
            // Clear reconnect try on intentional close
            socketSingleton.onclose = () => {};
            socketSingleton.close();
            socketSingleton = undefined;
        }
    };
};
