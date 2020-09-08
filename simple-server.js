console.log('My Node Server!!!');
var http = require('http');

const server = http.createServer((req, res) => {
   res.writeHead(200, {'Content-Type': 'text/html'});
   res.end('<i>Hello misterBIT</i>');
})

server.listen(3030, "localhost");

console.log('Server running at http://127.0.0.1:3030/');
