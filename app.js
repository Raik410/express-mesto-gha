const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.user = {
    _id: "62acab24b78ceb9e518e5c19",
  };
  next();
});

app.use('/users', router);
app.use((req, res) => res.status(404).send({ message: "Страница не найдена" }));

mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true, family: 4 })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App started on ${PORT} port`);
    });
  })
  .catch((e) => console.log(e));
