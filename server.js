var express = require('express');
var serveStatic = require('serve-static');
var application = express();

const loremIpsum = require("lorem-ipsum").loremIpsum;

var fs = require('fs');

var array = fs.readFileSync('words.txt', 'utf8').split('\n');

application.get('/words', function (req, res) {
    res.send(JSON.stringify(array));
})

application.get('/tweet', function (req, res) {
    let sentence = loremIpsum({
        words: array,
        units: "sentence",
        count: 1,
        format: "plain",
        sentenceLowerBound: 3,
        sentenceUpperBound: 7,
    })

    res.send(JSON.stringify({ response: `${sentence} #gc #gcdigital` }));
})

var port = process.env.PORT || 5000;

application.use(serveStatic(__dirname + "/dist"));

application.listen(port);

console.log('server started ' + port);
