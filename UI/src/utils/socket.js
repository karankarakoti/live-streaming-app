import io from "socket.io-client";

import { config } from "./config";

export const socket = io.connect(config.SOCKET_URL);