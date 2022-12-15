const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req,res){

// Post.find({},function(err,posts){
//      //home used below is home.ejs
//     return res.render('home',{             
//         title: "Codeisl | Home",
//         posts: posts
//     });
// });
   
//populate the user for each post
try{
    let posts = await Post.find({})
    .populate('user')
    .populate({
        path: 'comments', 
        populate: {
            path: 'user'
        }
    })
    
       let users = await User.find({});
            return res.render('home',{             
                title: "Codeial | Home",
                posts: posts,
                all_users: users
            });
}catch(err){
console.log('error',err);
return;
}

    
   
}
    
