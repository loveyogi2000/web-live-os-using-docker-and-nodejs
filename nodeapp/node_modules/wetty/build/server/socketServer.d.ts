import type SocketIO from 'socket.io';
import type { SSL, Server } from '../shared/interfaces.js';
export declare function server({ base, port, host, title, allowIframe }: Server, ssl?: SSL): Promise<SocketIO.Server>;
