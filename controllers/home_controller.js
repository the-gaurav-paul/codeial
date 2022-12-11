const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req,res){

// Post.find({},function(err,posts){
//      //home used below is home.ejs
//     return res.render('home',{             
//         title: "Codeisl | Home",
//         posts: posts
//     });
// });
   
//populate the user for each post
Post.find({})
.populate('user')
.populate({
    path: 'comments', 
    populate: {
        path: 'user'
    }
})
.exec(function(err,posts){
    User.find({},function(err,users){
        return res.render('home',{             
            title: "Codeisl | Home",
            posts: posts,
            all_users: users
        });
    });
   
})
    
}