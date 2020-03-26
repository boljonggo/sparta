var express = require('express');
var fs = require("fs");

var app = express();

// app.get('/', function(req, res) {
//     res.send('Hello, Express ···');
// });

app.get('/', function(req, res) {
    fs.readFile('./index.html', function(err, data) {
        if (err) {
            throw err;
        }

        res.writeHead(200, { "Content-Type": "text/html; charset=UTF8" });
        res.end(data);
    });
});

app.all('/list', function(req, res) {
    fs.readdir('../album', function(err, files) {
        var directories = [];
        (function iterator(i) {
            if (i == files.length) {
                console.log(directories);
                res.send(directories);
                return;
            }
            fs.stat('../album/' + files[i], function(err, stats) {
                console.log('../album/' + files[i]);
                if (stats.isDirectory()) {
                    directories.push(files[i]);
                }

                iterator(i + 1);
            });
        })(0);
    });
});

app.listen(80);