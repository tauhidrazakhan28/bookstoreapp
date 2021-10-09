const Book = require('../models/book');

exports.add = (req, res, next) => {
  const body = req.body;
  const newBook = new Book(body);
  newBook.save((err) => {
    if (err) {
      return res.status(400).json({ msg: 'Error while saving book.' });
    }
    res.status(201).json({ msg: 'Book has been saved successfully!' });
  });
}

exports.getAll = (req, res, next) => {
  Book.find({}, (err, result) => {
    if (err) {
      return res.status(400).json({ msg: 'Error while getting book list.' });
    }
    res.status(200).json({ result });
  });
};

exports.updateBook = (req, res, next) => {
  const body = req.body;
  const id = body._id;
  delete body._id;
  if (id && id !== '') {
    Book.findByIdAndUpdate(id, body, { upsert: true, useFindAndModify: false }, (err, result) => {
      if (err) {
        return res.status(400).json({ msg: 'Error while updating book.' });
      }
      res.status(200).json({ msg: 'Book has been updated successfully.' });
    });
  } else {
    res.status(400).json({ msg: 'Invalid input.' });
  }
}

exports.deleteBook = (req, res, next) => {
  const { id } = req.body;
  if (id && id !== '') {
    Book.findByIdAndDelete(id, { useFindAndModify: false }, (err, result) => {
      if (err) {
        return res.status(400).json({ msg: 'Error while deleting book.' });
      }
      res.status(200).json({ msg: 'Book has been deleted successfully.' });
    });
  } else {
    res.status(400).json({ msg: 'Invalid input.' });
  }
};