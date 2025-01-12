import { io } from "socket.io-client";
import { IMAGE_BASE_URL as SOCKET_BASE_URL } from "../utils";

export const socketInit = () => {
    console.log("SOCKET_BASE_URL", SOCKET_BASE_URL);
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    }

    return io(SOCKET_BASE_URL, options);
}