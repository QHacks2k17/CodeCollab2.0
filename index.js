var http = require('http');
var fs = require('fs');
var filePath = req.url;
if (filePath == '/')
    filePath = '/index.html';

filePath = __dirname + filePath;
var extname = path.extname(filePath);
var contentType = 'text/html';

switch (extname) {
case '.js':
    contentType = 'text/javascript';
    break;
case '.css':
    contentType = 'text/css';
    break;
}

fs.exists(filePath, function (exists) {

            if (exists) {
                fs.readFile(filePath, function (error, content) {
                    if (error) {
                        res.writeHead(500);
                        res.end();
                    } else {
                        res.writeHead(200, {
                            'Content-Type': contentType
                        });
                        res.end(content, 'utf-8');
                    }
                });
                http.createServer(function (request, response) {
                    response.writeHeader(200, {
                        "Content-Type": "text/html"
                    }); // <-- HERE!
                    response.write(html); // <-- HERE!
                    response.end();
                }).listen(1337, '127.0.0.1');
            }