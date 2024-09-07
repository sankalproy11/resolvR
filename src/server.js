const dgram = require("dgram");
const { off } = require("process");
const server = dgram.createSocket("udp4");

server.on("message", (msg, rinfo) => {
  console.log(`Received packet from ${rinfo.address}:${rinfo.port}`);
  console.log(`Received raw buffer from: `, msg);
  console.log(`Buffer Length: `, msg.length);

  try {
    //parsing of header
    const transactionId = msg.readUint16BE(0);
    const flags = msg.readUint16BE(2);
    const questionCount = msg.readUInt16BE(4);
    const answerCount = msg.readUInt16BE(6);
    const authorityCount = msg.readUInt16BE(8);
    const additionalCount = msg.readUInt16BE(10);

    console.log(`Transaction ID: ${transactionId.toString(2)}`);
    console.log(`Flags: ${flags.toString(2)}`);
    console.log(`Question Count: ${questionCount}`);
    console.log(`Answer Count: ${answerCount}`);
    console.log(`Authority Count: ${authorityCount}`);
    console.log(`Additional Count: ${additionalCount}`);

    // parsing of domain
    let offset = 12;
    const domainParts = [];

    while (msg[offset] !== 0x00) {
      const length = msg[offset];
      domainParts.push(msg.toString("utf-8", offset + 1, offset + 1 + length));
      offset += length + 1;
    }

    // skip the end of the domain name
    offset += 1;

    //queryType
    const queryType = msg.readUInt16BE(offset);
    const queryClass = msg.readUInt16BE(offset + 2);

    const domainName = domainParts.join(".");
    console.log(`Domain Queried: `, domainName);
    console.log(`Query Type: `, queryType);
    console.log(`Query Class: `, queryClass);
  } catch (error) {
    console.error("Error parsing DNS packet:", error.message);
  }
});

server.bind(8080, () => {
  console.log("Server is running on port 8080!");
});
