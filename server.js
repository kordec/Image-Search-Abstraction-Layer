// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var db = require('./database')
var GoogleImages = require('google-images')
var google = new GoogleImages(process.env.G_ID, process.env.G_KEY)
db.connect()

  

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/imagesearch", function (req, res, next) {
  let q = req.query['q']
  let offset = Number(req.query['offset'])
  if(!q) res.send({err: 'unexpected query'})
    
  db.insert({query: q, when: new Date()})
  google.search(q, {page: offset}).then(images => {
    res.send(images)
  }).catch(err => {
    console.log(err)
  }) 
})

app.get("/latest", function(req, res) {
  db.get({}, function(data) {
    res.send(
      data.reverse()
             .slice(0, 10)
             .map(item => 
                  new Object({query:item.query, when:item.when}))
            )
  })
})
    

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
