const User = require("../models/user");
module.exports.profile = function (req, res) {
  //user_profile used below is user_profile.ejs
  return res.render("user_profile", {
    title: "profile",
  });
};

//render user signup page
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Sign Up",
  });
};

//render user signin page
module.exports.signIn = function (req, res) {
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
  //todo
};
