const { WebSocketServer } = require("ws");


const initWebsocket = (server) => {
    const wss = new WebSocketServer({ server });

    wss.on("connection", function connection(ws, request) {
        console.log("New client connected");

        ws.on("error", console.error);

        ws.on("message", function message(data) {
            try {
                const parsed = JSON.parse(data);
                console.log("Received message =>", parsed);

                // 广播给所有客户端
                wss.clients.forEach(function each(client) {
                    if (client.readyState === ws.OPEN) {
                        client.send(JSON.stringify(parsed), { binary: false });
                    }
                });
            } catch (err) {
                console.error("Invalid message format", err);
            }
        });
    });
};

module.exports = {
    initWebsocket,
};
