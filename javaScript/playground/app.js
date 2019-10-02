const http = require('http');

http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello World2');
}).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');