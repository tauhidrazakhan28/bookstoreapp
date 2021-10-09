const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/book-store', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(process.cwd() + '/public'));

app.use('/book', routes.book);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(8000, () => {
  console.log('server running on port 8000!');
});