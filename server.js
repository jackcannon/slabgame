var express = require('express');
var fs      = require('fs');
var http = require('http');

var app = express.createServer(/*express.logger()*/);

var pattern = [
  { answer: 'slab', thought: 'slab' },
  { answer: 'block', thought: 'block' },
  { answer: 'pillar', thought: 'beam' },
  { answer: 'pillar', thought: 'football' }
];

app.configure(function(){
  app.use(express.static(__dirname + '/site'));
});

app.get('/getPattern', function(req, res) {
  res.send(JSON.stringify(pattern));
});

app.get('/setPattern', function(req, res) {
  pattern = JSON.parse(req.query.pattern);
  res.send('done');
});

app.get('/*', function(req, res) {
  var path = req.url;
  res.send(fs.readFileSync(__dirname + '/' + 'site/index.html', 'utf8'));
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('Server is running on port \"' + port + '\"');
});