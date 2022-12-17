const User = require("../models/user");
const fs = require('fs');
const path = require('path');


module.exports.profile = function (req, res) {
  User.findById(req.params.id,function(err,user){
    //user_profile used below is user_profile.ejs
    return res.render("user_profile", {
      title: "User profile",
      profile_user: user
    });
  });
 
};

module.exports.update = async function(req,res){
  // if(req.user.id == req.params.id){
  //   User.findByIdAndUpdate(req.params.id, req.body,function(err,user){
  //     return res.redirect('back');
  //   });
  // }else{
  //   req.flash('error','Unauthorized!');
  //   return res.status(401).send('Unauhtorised');
  // }

  //after async await
  if(req.user.id == req.params.id){
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req,res,function(err){
        if(err){
          console.log('********Multer error',err);
        }
        user.name = req.body.name;
        user.email = req.body.email;

        if(req.file){

          if(user.avatar){
            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
          }

          //this is saving the path of the uploaded file into the avatar field in the user
          user.avatar = User.avatarPath + '/' + req.file.filename;
        }
        user.save();
        return res.redirect('back');
       
      });
    } catch (err) {
      req.flash('error',err);
      return res.redirect('back');
    }
  }else{
    req.flash('error', 'Unauthorized!');
    return res.status(401).send('Unauthorized');
  }
}

//render user signup page
module.exports.signUp = function (req, res) {
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  return res.render("user_sign_up", {
    title: "Sign Up",
  });
};

//render user signin page
module.exports.signIn = function (req, res) {
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  return res.render("user_sign_in", {
    title: "Sign In",
  });
};

//get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      if (err) {
        console.log("error in finding the user");
        return;
      }
      if (!user) {
        User.create(req.body, function (err, user) {
          if (err) {
            console.log("error while creating the user");
          }
          return res.redirect("/users/sign-in");
        });
      } else {
        return res.redirect("back");
      }
    }
  );
};

//get the sign in data
module.exports.createSession = function (req, res) {
  req.flash('success','Logged in successfully');
   return res.redirect('/');
};


module.exports.destroySession = function(req,res){
  req.logout(function(err){
    if(err){
      return res.redirect('back');
    }
    req.flash('success','Logged out successfully');
  });
 
  req.flash('success','Logged out successfully');
  return res.redirect('/');
}