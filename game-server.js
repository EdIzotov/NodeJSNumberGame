const http = require('http');
const fs = require('fs');

const requestListener = function (req, res) {
    fs.readFile('./ui/index.html', function (err, data) {
        if (err) {
            console.log(err);
        }
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length': data.length});
        res.write(data);
        res.end();
    });
}

const server = http.createServer(requestListener);
server.listen(8080);