import { Server } from "socket.io";
import * as Cookies from 'es-cookie';
import jwt from 'jsonwebtoken';
import { encryptCaribou } from '../utils/utils';

// For development only, using vite plugin for web sockets
// For production we would have to create our own node adapter
export const chatServerPlugin = {
    name: 'chatServerPlugin',
    configureServer(server) {
        const io = new Server(server.httpServer);
        initChat(io);
    }
}

function initChat(io) {
    const users = {}
    const history = [];
    const addToHistory = (message) => {
        history.push(message);
        if (history.length > 100) {
            history.shift();
        }
    };

    io.use(async (socket, next) => {
        const cookies = Cookies.parse(socket.handshake.headers.cookie);
        if (cookies.AuthorizationToken) {
            try {
                const jwtUser = jwt.verify(cookies.AuthorizationToken.slice(7), process.env.JWT_SECRET);
                socket.data.user = {
                    id: jwtUser.id,
                    email: jwtUser.email
                };
            } catch (error) {
                next(new Error("Invalid authentication"));
            }
        } else {
            next(new Error("Invalid authentication"));
        }
        next();
    });
    io.on('connection', socket => {
        socket.emit('chat-users', users);
        socket.emit('chat-history', history);
        socket.on('chat-connect', () => {
            if (!users[socket.data.user.id]) {
                const m = { notification: true, message: `${socket.data.user.email.split('@')[0]} is ready to antler exchange`, time: Date.now(), user: socket.data.user }
                addToHistory(m);
                users[socket.data.user.id] = socket.data.user;
                socket.data.user.count = 1;
                io.emit('user-connected', m);
            } else {
                socket.data.user.count++;
            }
        })
        socket.on('disconnect', () => {
            if (users[socket.data.user.id]) {
                socket.data.user.count--;
                if (socket.data.user.count == 0) {
                    const m = { notification: true, message: `${socket.data.user.email.split('@')[0]} left the antler exchange`, time: Date.now(), user: socket.data.user }
                    addToHistory(m);
                    io.emit('user-disconnected', m);
                    delete users[socket.data.user.id];
                }
            }
        })
        socket.on('chat-message-send', message => {
            const m = { message: encryptCaribou(message), time: Date.now(), user: socket.data.user }
            addToHistory(m);
            io.emit('chat-message', m);
        })
    });
}

