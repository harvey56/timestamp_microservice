var express = require('express');
var http = require('http');
var url = require('url');
var path = require("path");
var app = express();

var intRegex = /^\d+$/;
var dateRegex = /^\bJanuary\b|\bFebruary\b|\bMarch\b|\bApril\b|\bMay\b|\bJune\b|\bJuly\b|\bAugust\b|\bSeptember\b|\bOctober\b|\bNovember\b|\bDecember\b \d{2}, \d{4}$/;
var output = {};

function unixTime(t){
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var date = new Date(t*1000);
    var month = months[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();
    var natural = month + " " + day + ", " + year;
    
    output.unixtime = t;
    output.natural = natural;
}

app.use(express.static(__dirname + '/views'));

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname + '/views/index.html'));
})

app.use("/", function(req, res){
    var pathname = url.parse(req.url).pathname;
    var urlext = pathname.slice(1);
    
    var d = decodeURIComponent(urlext);
    
    if (intRegex.test(urlext)){
       unixTime(urlext);
       res.send(output);
    }
    
    else if (dateRegex.test(d)) {
        output.unixtime = (Date.parse(d))/1000;
        output.natural = d;
        res.send(output);
    }
    
    else {
        output.unixtime = "null";
        output.natural = "null";
        res.send(output);
    } 
})

http.createServer(app).listen(8080);