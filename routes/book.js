const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');

router.get('/', (req, res, next) => {
  res.send('welcome home!');
});

router.post('/add', bookController.add);
router.get('/all', bookController.getAll);
router.put('/update', bookController.updateBook);
router.delete('/delete', bookController.deleteBook);

module.exports = router;