var express = require('express');
var router = express.Router();

const bookController = require('../controllers/books.controller');


router.get('/', bookController.getBooks);

router.post('/', bookController.addBook);

router.delete('/:id', bookController.deleteBook);

router.get('/:id', bookController.editBook);

router.put('/:id', bookController.updataBook);


module.exports = router;

