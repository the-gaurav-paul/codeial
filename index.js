const exp = require('express');
const cookieParser = require('cookie-parser');
const app = exp();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//used for session cookie
const session  = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
// const sassMiddleware = require('node-sass');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
// app.use(sassMiddleware({
//     src: './assets/scss',
//     dest: './assets/css',
//     debug: true,
//     outputStye: 'extended',
//     prefix: '/css'
// }));
app.use(exp.urlencoded());
app.use(cookieParser());
app.use(exp.static('./assets'));

//make the uploads path visible to browser
app.use('/uploads',exp.static(__dirname + '/uploads'));
app.use(expressLayouts);

/*extract styles and scripts of individual pages and to 
place it below respectively in the index.html */
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine', 'ejs');
app.set('views','./views');

//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    secret:'something',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
        mongooseConnection: db,
        autoRemove: 'disabled'
        },
        function(err){
        console.log(err || 'connect-mongodb setup ok');
    }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
//use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
     console.log(`Error in running server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});