const express = require('express');
const app     = express();
const bodyParser = require('body-parser');
const cors    = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
require('dotenv').config()

require('./db/db');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const corsOptions = {
	origin: 'https://travelers-pin-board.herokuapp.com/',
	credentials: true,
	optionsSuccessStatus: 200
}
const options = app.use(cors(corsOptions));

app.use(session({
	secret: '1a2B3c4Z5y',
	store: new MongoStore(options)
}));


const postsController = require('./controllers/posts.js');
const usersController = require('./controllers/users.js');

//url path to controllers
app.use('/posts', postsController);
app.use('/user', usersController);


//connected to port 9000
app.listen(process.env.PORT, () => {
	console.log('listening on port 9000');
});