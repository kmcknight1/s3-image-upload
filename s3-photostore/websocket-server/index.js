const WebSocket = require("ws");
const server = new WebSocket.Server({
  port: 1234
});

module.exports = {
  broadcast
};

function broadcast(data) {
  server.clients.forEach(ws => {
    ws.send(data);
  });
}

server.on("connection", ws => {
  ws.on("message", data => {
    broadcast(data);
  });
});

// server.on("connection", ws => {
//   ws.on("request", data => {
//     broadcast(data);
//   });
// });
