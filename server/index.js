/* WebSocket io is a library that enables real-time, bidirectional and event-based communication between the browser and the server.
 the polling mechaism of HTTP is replaced by a persistant connection that allows for realtimme data exchange.
 pooling is a overkill for chat applications where low latency is crucial.
*/
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
// Initialize Express app and HTTP server with Socket.IO integration 
const app = express(); // Initialize Express app
const server = http.createServer(app); // Create HTTP server
const io = new Server(server);  // Initialize Socket.IO server
// Serve static files from the "public" directory 
app.use(express.static("public")); // Serve static files from the "public" directory
// Handle Socket.IO connections and chat message broadcasting
// The steps to handle incoming chat messages and broadcast them to all connected clients


io.on("connection", (socket) => {
  socket.on("chat-message", (msg) => {
    io.emit("chat-message", {
      id: socket.id,      // Sender's socket ID
      message: msg,  // The chat message
      // time: new Date().toLocaleTimeString()  // Add timestamp to the message
    });
  });
});

server.listen(3000, () => {
  console.log("ChatApp running on http://localhost:3000");
});