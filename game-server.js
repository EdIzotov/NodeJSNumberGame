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
    if (req.method == 'GET' && (req.url == '/' || req.url == '/index.html')) {
        readFile('./ui/index.html', res);
    } else if (req.method == 'GET' && req.url == '/js/game.js') {
        readFile('./ui/js/game.js', res);
    } else if (req.method == 'POST' && req.url == '/newgame') {
        number = getRandomInt();
        answers = [];
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({ success: true, error: null, data: { result: '', answers: answers }}));
        res.end();
    } else if (req.method == 'POST' && req.url == '/game') {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            let answer = +JSON.parse(data).answer;
            answers.push(answer);
            res.writeHead(200, {'Content-Type': 'application/json'});
            let responseAnswer;
            if (answer == number) {
                responseAnswer = 'win';
                number = getRandomInt();
                answers = [];
            } else if (answer < number) {
                responseAnswer = 'more';
            } else if (answer > number) {
                responseAnswer = 'less';
            }
            res.write(JSON.stringify({ success: true, error: null, data: { result: responseAnswer, answers: answers }}));
            res.end();
        });
    }
}

const server = http.createServer(requestListener);
number = getRandomInt();
server.listen(8080);