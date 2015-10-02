var express = require('express'),
    restful = require('node-restful'),
    mongoose = restful.mongoose;
    bodyParser = require('body-parser');

var app = express();


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});
app.use(bodyParser.json());
app.use(express.query());

mongoose.connect(process.env.DB_URL);

var Pet = app.pet = restful.model('pet', mongoose.Schema({
    name: 'string',
    birthday: 'number',
  }))
  .methods(['get', 'post', 'put']);

Pet.register(app, '/pet');

app.listen(process.env.PORT || 3000);