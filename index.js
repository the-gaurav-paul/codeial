const exp = require('express');
const cookieParser = require('cookie-parser');
const app = exp();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
app.use(exp.urlencoded());
app.use(cookieParser());
app.use(exp.static('./assets'));
app.use(expressLayouts);

/*extract styles and scripts of individual pages and to 
place it below respectively in the index.html */
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views','./views');



app.listen(port, function(err){
    if(err){
     console.log(`Error in running server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});