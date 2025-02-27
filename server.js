const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

console.log("WebSocket server running on ws://localhost:8080");

wss.on("connection", (ws) => {
    console.log("New client connected");

    // Send a welcome message
    ws.send(JSON.stringify({ message: "Connected to WebSocket server" }));

    // Send ball data every 2 seconds
    let ballCount = 0;
    const interval = setInterval(() => {
        if (ballCount < 5) {
            const ballData = {
                number: Math.floor(Math.random() * 42) + 1, // Random number 1-42
                color: Math.random() > 0.5 ? "black" : "#FFBF00", // Random color
            };
            ws.send(JSON.stringify(ballData));
            ballCount++;
        } else {
            clearInterval(interval);
        }
    }, 2000);

    // Handle client messages
    ws.on("message", (message) => {
        console.log("Received from client:", message);
    });

    // Handle client disconnect
    ws.on("close", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});
