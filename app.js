const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const methodOverride = require('method-override')
const flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport')


const ideas = require('./routes/ideas');
const users = require('./routes/users');

require('./config/passport')(passport);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/first_mongoose_app', {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('MONGODB connected');
    })
    .catch((err) => {
        console.log(err);
    })

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null
    next();
})


app.get('/', function (req, res) {
    res.render('index');
})

app.get('/about', (req, res) => {
    res.render('about');
})


app.get('/about', (req, res) => {
    res.render('about');
})

app.use('/users', users)
app.use('/ideas', ideas)
const port = 3000;

app.listen(port, () => {
    console.log("Listening to 3000");
})