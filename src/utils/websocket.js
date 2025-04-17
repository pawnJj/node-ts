const { WebSocketServer } = require("ws");
const http = require("http");

const initWebsocket = () => {
    const server = http.createServer();

    const wss = new WebSocketServer({ server });

    wss.on("connection", function connection(ws, request) {
        ws.on("error", console.error);
        ws.on("message", async function message(data) {
            const message = JSON.parse(data);
            console.log("Received message => ", message);
            wss.clients.forEach(function each(client) {
                if (client.readyState === ws.OPEN) {
                    client.send(JSON.stringify(message), { binary: false });
                }
            });
        });
    });

    const PORT = process.env.PORT || 6688;
    server.listen(PORT, () => {
        console.log("WebSocket initialized successfully on port: " + PORT);
    });
};

module.exports = {
    initWebsocket,
};
