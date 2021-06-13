var http = require('http');
var express = require('express');
var port = process.env.PORT || 3000
var app = express();
var userRouter = require('./routes/userRouter');
var bookRouter = require('./routes/bookRouter');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

mongoose.connect("mongodb://localhost:27017/booklib", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/users', userRouter)
app.use('/books', bookRouter)


http.createServer(app).listen(port);

console.log('Backend running on port :', port);