const bodyParser = require('body-parser');
let express = require('express');
path = require('path');
mongoose = require('mongoose');
cors = require('cors');
bodyParser = ('body-parser');
mongoDb = require('./database/db');
mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database succesful');
},
error => {
    console.log('Database error: ' + error);
})

const bookRoute = require('./routes/book.routes');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

//Static directory path
app.use(express(path.json(__dirname, 'dist/proyecto')));

//API root
app.use('/api', bookRoute);

//Port
const port = process.env.PORT || 8000;

app.listen(port, () =>{
    console.log('listening to port ' + port);
})

//404 Handler

app.use((req, res, next) =>{
    next(createError(404));
});

//Base route
app.get('/', (req, res) => {
    res.send('Invalid enpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, 'dist/api_myRecipeBook'));
});

//error handler
app.use(function(err, req, res, next){
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;      
    res.status(err.statusCode).send(err.message);
});