// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var port = 8080;
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'comments'
});

// Create server
http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    var url = req.url;
    if (url === '/') {
        filename = './index.html';
    }
    else if (url === '/index.html') {
        filename = './index.html';
    }
    else if (url === '/comments.html') {
        filename = './comments.html';
    }
    else if (url === '/comments') {
        var comments = [];
        connection.connect(function (err) {
            if (err)
                throw err;
            console.log("Connected!");
            connection.query("SELECT * FROM comments", function (err, result, fields) {
                if (err)
                    throw err;
                comments = result;
                console.log(result);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(comments));
            });
        });
    }
    else if (url === '/comments.js') {
        filename = './comments.js';
    }
    else if (url === '/comments.css') {
        filename = './comments.css';
    }
    else {
