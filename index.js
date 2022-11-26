const exp = require('express');
const app = exp();
const port = 8000;

app.listen(port, function(err){
    if(err){
     console.log(`Error in running server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
})