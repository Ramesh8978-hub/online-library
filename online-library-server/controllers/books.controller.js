const Book = require('../models/book');

exports.getBooks = async (req, res, next) => {
    try {
        let books = await Book.find().exec();
        res.send(books);
    }
    catch (e) {
        res.status(500).send({ messsage: "Something went wrong" });
    }
};
exports.addBook = async (req, res) => {
    try {
        await Book.create(req.body, (err, result) => {
            res.status(200).send({
                messsage: "Created Book successfully",
            });
        })
    }
    catch (e) {
        res.status(500).send({ messsage: "Something went wrong" });
    }
};
exports.deleteBook = async (req, res) => {
    try {
        await Book.deleteOne({ _id: req.params.id }, (err, result) => {
            res.send(result);
        })
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
};
exports.editBook = async (req, res) => {
    try {
        let book = await Book.findById(req.params.id).exec();
        if (book) {
            res.status(200).send(book);
        } else {
            res.status(404).send("No Data Found");
        }
    } catch (e) {
        res.status(500).send({ messsage: "Something went wrong" });
    }
}
exports.updataBook = async (req, res) => {
    try {
        await Book.updateOne(
            { _id: req.params.id },
            req.body
        ).exec();
        res.status(200).send({
            messsage: "Updated successfully",
        });
    } catch (error) {
        res.status(500).send({
            messsage: "Something went wrong when updaing",
        });
    }
};


