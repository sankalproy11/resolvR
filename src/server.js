const dgram = require("dgram");
const server = dgram.createSocket("udp4");

server.on("message", (msg, rinfo) => {
  console.log(`Received packet from ${rinfo.address}:${rinfo.port}`);
  console.log(`Received raw buffer from: `, msg);
  console.log(`Buffer Length: `, msg.length);

  try {
    const transactionId = msg.readUint16BE(0);
    const flags = msg.readUint16BE(2);
    const questionCount = msg.readUInt16BE(4);
    const answerCount = msg.readUInt16BE(6);
    const authorityCount = msg.readUInt16BE(8);
    const additionalCount = msg.readUInt16BE(10);

    console.log(`Transaction ID: ${transactionId}`);
    console.log(`Flags: ${flags}`);
    console.log(`Question Count: ${questionCount}`);
    console.log(`Answer Count: ${answerCount}`);
    console.log(`Authority Count: ${authorityCount}`);
    console.log(`Additional Count: ${additionalCount}`);
  } catch (error) {
    console.error("Error parsing DNS packet:", error.message);
  }
});

server.bind(8080, () => {
  console.log("Server is running on port 8080!");
});
