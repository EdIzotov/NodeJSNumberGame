const http = require('http');
const fs = require('fs');

const MAX_NUMBER = 99;
let number;
let answers = [];

function getRandomInt() {
    return Math.floor(Math.random() * MAX_NUMBER) + 1;
}

function readFile(fileName, res) {
    fs.readFile(fileName, function (err, data) {
        if (err) {
            console.log(err);
        }
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length': data.length});
        res.write(data);
        res.end();
    });
}

const requestListener = function (req, res) {
    console.log("********************************************");
    console.log(req.method + ' ' + req.url);
    console.log("********************************************");
    if (req.method == 'GET' && (req.url == '/' || req.url == '/index.html')) {
        readFile('./ui/index.html', res);
    } else if (req.method == 'GET' && req.url == '/js/game.js') {
        readFile('./ui/js/game.js', res);
    } else if (req.method == 'POST' && req.url == '/newgame') {
        number = getRandomInt();
        answers = [];
        console.log(number);
    }
}

const server = http.createServer(requestListener);
number = getRandomInt();
server.listen(8080);