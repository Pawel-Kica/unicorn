import { Server } from "socket.io";
import { ORIGIN } from "./config/env.config";
import server from "./server";
import cookie from "cookie";
import { verifyUserTokenJWT } from "./config/jwt.config";
import { findSingleSession } from "./services/session/session.services";

export const socketServerOptions = {
    cookie: true,
    cors: {
        origin: ORIGIN,
        credentials: true,
    },
};

const ioInstance = new Server(server, socketServerOptions);

ioInstance.use(async (socket, next) => {
    try {
        const cookies = cookie.parse(socket.handshake.headers.cookie || "");
        const { decoded } = verifyUserTokenJWT(cookies.accessToken);

        console.log(decoded);

        if (!decoded) throw Error();

        const session = await findSingleSession({ id: decoded.sessionId });
        if (!session || !session.valid) throw Error();

        //@ts-ignore
        socket.request.user = decoded;

        next();
    } catch (e) {
        next(new Error("forbidden"));
    }
});

export default ioInstance;
