const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  let test = {data: [{name: "David", termperature: 36.545, time: new Date()},{name: "Joe", termperature: 45.023, time: new Date()},{name: "Justin", termperature: 48.0483, time: new Date()}]}
  let result = JSON.stringify(test)
  res.end(result);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
