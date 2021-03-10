const Book = require('../models/Book');
const jwt = require('jsonwebtoken');
const { response } = require('express');

exports.findBooks = async (req, res) => {
  const books = await Book.find();
  res.send({ data: books });
};

// exports.findBooks = (req, res) => {
//   jwt.verify(req.token, 'secreetkey', (err, au) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       // const books = Book.find();
//       // res.send({ data: books });
//       // au;
//       console.log('hhhhh');
//     }
//   });
// };

exports.createbook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.send({ data: book });
};

exports.findBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.send({ data: book });
  } catch (error) {
    res.status(404).send({ error: 'book not found' });
  }
};

exports.updatebook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    Object.assign(book, req.body);
    book.save();
    res.send({ data: book });
  } catch (error) {
    res.status(404).send({ error: 'book not found' });
  }
};

exports.deletbooks = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    await book.remove();
    res.send({ data: true });
  } catch (error) {
    res.status(404).send({ error: 'book not found' });
  }
};

exports.loginroute = (req, res) => {
  //fake user
  const user = { id: 0 };

  const token = jwt.sign({ user }, 'secreetkey', { expiresIn: 60 });
  res.json({
    token: token,
  });
};

// exports.verifytoken = (req, res) => {
//   const bearerhader = req.headers['authorization'];
//   if (typeof bearerhader !== 'undefined') {
//     const bearer = bearerhader.split(' ');
//     const bearertoken = bearer[1];
//     req.token = bearertoken;
//   } else {
//     res.sendStatus(403);
//   }
// };

// exports.loginroute = (req, res) => {
//   //fake user
//   const user = { id: 0 };

//   const token = jwt.sign({ user }, 'secreetkey');
//   res.header('auth-token', token).send(token);
// };
//***************************************************************************************** hetheya s7i7a */
exports.verifytoken = (req, res, next) => {
  const tt = req.header('authorization');
  if (!tt) return res.status(401).send('acces denied');
  try {
    const verified = jwt.verify(tt, 'secreetkey');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('invalid token ');
  }
};
