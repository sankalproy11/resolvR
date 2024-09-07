const dgram = require("dgram");
const server = dgram.createSocket("udp4");

server.on("message", (msg) => {
  console.log("Received Buffer: ", msg);
  console.log("Buffer length: ", msg.length);
  console.log("Buffer As string: ", msg.toString("utf-8"));
});

server.bind(8080, () => {
  console.log("Server is running on port 8080!");
});
