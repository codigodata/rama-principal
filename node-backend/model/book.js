const mongoose = require('mongoose');
const SCHEMA = mongoose.Schema;

let Book = new Schema({
    Pais: {
        type: String
    },
    Recetario: {
        type: String
    }, 
    Collection: {
        collection: 'books'
    }
})