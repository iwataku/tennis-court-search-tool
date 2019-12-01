var express = require('express');
var app = express();

var search_kitaku = require('./lib/search_kitaku');
var search_chuoku = require('./lib/search_chuoku');
var redis = require("redis")
var url = require("url")
var rtg = url.parse("redis://h:pe2acea3b665fbd43eaac9094c5d26761c084bac812958b7f0e83c62310c027ec@ec2-34-204-242-91.compute-1.amazonaws.com:55139");

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('pages/index');
});
app.get('/request_kitaku', function(request, response) {
    search_kitaku.handler()
    response.render('pages/request_queued');
});
app.get('/request_chuoku', function(request, response) {
    search_chuoku.handler()
    response.render('pages/request_queued');
});

app.get('/sleep1', function(request, response) {
    setTimeout(() => {
        response.writeHead(200, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({'id': 'sleep1'}))
    }, 1000);
});
app.get('/sleep2', function(request, response) {
    setTimeout(() => {
        response.writeHead(200, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({'id': 'sleep2'}))
    }, 1000);
});

app.get('/courts_result', function(request, response) {
    var date = new Date();　
    date.setHours(date.getHours() + 9);　
    var date_format = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + " " + date.getHours() + "時時点のコート状況"
    var client = redis.createClient(rtg.port, rtg.hostname);
    client.auth(rtg.auth.split(":")[1]);
    client.lrange('kitaku_courts', 0, -1, function(err, kitaku_courts) {
        client.lrange('chuoku_courts', 0, -1, function(err, chuoku_courts) {
            response.render('pages/courts', {
                kitaku_courts: kitaku_courts,
                chuoku_courts: chuoku_courts,
                date: date_format
            });
        });
    })
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});