const { WebSocketServer } = require("ws");
const WebSocket = require("ws");

const initWebsocket = () => {
    const wss = new WebSocketServer({ port: 6688 });

    if (wss) {
        console.log("websocket Initialized successfully on port: " + 6688);
    }

    wss.on("connection", function connection(ws, request) {
        ws.on("error", console.error);
        ws.on("message", async function message(data) {
            const message = JSON.parse(data);
            console.log("Received message => ", message);
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(message), { binary: false });
                }
            });
        })
    })
}

module.exports = {
    initWebsocket,
};