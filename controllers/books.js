const Book = require('../models/book');
const fs = require('fs');

exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
};

exports.getBestRatingBooks = (req, res, next) => {
    Book.find().sort({ averageRating: -1 }).limit(3)
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};

exports.createBook = (req, res, next) => { 
  console.log("createBook");
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    const book = new Book({
        ...bookObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    book.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => {console.log(error);
          res.status(400).json({ error })});
};

exports.modifyBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    delete bookObject._userId;
    Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => {
            const filename = book.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Book.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.addRatingToBook = (req, res, next) => {
    console.log('Start addRatingToBook', { userId: req.auth.userId, body: req.body });

    const userId = req.auth.userId;
    const grade = Number(req.body.rating);
    const userRating = { userId, grade };
    console.log('User rating to add', userRating);

    console.log('Book ID:', req.params.id);

    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (!book) {
                console.log('No book found with ID:', req.params.id);
                return res.status(404).json({ message: 'Livre non trouvé' });
            }

            book.ratings.push(userRating);
            
            const sumRatings = book.ratings.reduce((sum, rating) => sum + rating.grade, 0);
            book.averageRating = sumRatings / book.ratings.length;

            return book.save();
        })
        .then(book => res.json(book)) // Envoie directement le livre sauvegardé au client
        .catch(error => {
            console.error('Error in addRatingToBook:', error);
            res.status(500).json({ error });
        });
};
