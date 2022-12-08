module.exports.home = function(req,res){


    ////home used below is home.ejs
    return res.render('home',{             
        title: "Home"
    })
}