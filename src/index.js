const express = require('express');
const mongoose = require('mongoose');
const bookcontroller = require('./controllers/books');
const cors = require('cors');
mongoose
  .connect('mongodb://localhost:27017/first-data', {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(8000, () => {
      console.log('server run ');
    });
  })
  .catch(() => {
    console.log('database connection failed');
  });

const app = express();
app.use(express.json());
app.use(cors());

app.get('/books', bookcontroller.findBooks);
app.post('/addbook', bookcontroller.createbook);
app.get('/books/:id', bookcontroller.findBook);
app.patch('/books/:id', bookcontroller.updatebook);
app.delete('/books/:id', bookcontroller.deletbooks);
app.get('/login', bookcontroller.loginroute);
