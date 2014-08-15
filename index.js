var express = require('express'),
    restful = require('node-restful'),
    mongoose = restful.mongoose;
    secrets = require('./secrets')
    bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(express.query());

var mongooseUrl = 'mongodb://' + secrets.mongolab.petstore.username + ':' +
  secrets.mongolab.petstore.password + '@ds055709.mongolab.com:55709/petstore';
mongoose.connect(mongooseUrl);

var Pet = app.pet = restful.model('pet', mongoose.Schema({
    name: 'string',
    birthday: 'number',
  }))
  .methods(['get', 'post', 'put']);

Pet.register(app, '/pet');

app.listen(process.env.PORT || 3000);