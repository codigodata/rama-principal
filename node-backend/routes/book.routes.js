const express = require('express');
const { retryWhen } = require('rxjs');
const app = express();

const bookRoutes = express.Router();
let Book = require('../model/book');

//Add Book
bookRoutes.route('/add-book').post((req, res, next) => {
    Book.create(req.bodu, (error, data) => {
        if (error) {
            return next(error)
        }else{
            res.json(data)
        }
    })
});

//Get All Books
bookRoutes.route('/').get((req, res) => {
    Book.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

//Get Book
bookRoutes.route('/update-book/:id').put((req, res, next) => {
    Book.findByIdUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
            console.log('Recipe update succesful!')
        }
    })
})

//Delete Book
bookRoutes.route('/delete-book/:id').delete((req, res, next) => {
    Book.findByIdRemove(req.params.id, (error, data) => { 
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = bookRoutes
