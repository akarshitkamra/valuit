'use strict'

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
// const User = require('../models/User');
const Admin = require('../models/Admin');

// passport.use(
//   'login',
//   new localStrategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password'
//     },
//     async (email, password, done) => {
//       try {
//         const user = await User.findOne({ email });
//         if (!user) {
//           return done(null, false, { message: 'User not found' });
//         }
       
//         User.comparePassword(password, user.password, (err, isMatch) => {
//             if(err) return done(null, false, { message: 'Wrong Password' });
//             if(isMatch) {
//                 return done(null, user, { message: 'Logged in Successfully' });
//             }
//             return done(null, false, { message: 'Wrong Password' });
//         })
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );



// Admin
// Passport login configs
passport.use('adminLocal', new localStrategy(                     
    function(username, password, done){                            
      Admin.getUserByEmail(username, async function(err, admin){
            if(err) throw err;
            if(!admin){
                return done (null, false, {message: "Email is not registered"});
            }  
            if(!admin.status){
              return done(null, false, { message: 'This account is deactivated by admin!' });
            }
            try {
              let isMatch = await Admin.comparePassword(password, admin.password)
              if(isMatch){
                  return done(null, admin);
              } else {
                  return done(null, false, {message: "Incorrect Password"});
              }
            } catch (error) {
              console.log(error)
              throw error;
            }
      })
}));  

passport.serializeUser(function(user, done) {    //Serializing & DeSerializing for browser session
    var key = {
      id: user._id,
      type: user.type
    }
    done(null, key);
});

passport.deserializeUser(function(key, done) {
    var Model;
    switch (key.type) {
        case 'admin':
            Model = Admin;
            break;
        case 'user':
            Model = User;
            break;
        default:
            break;
    }
    Model.findOne({_id: key.id}, '-salt -password', function(err, user) {
        done(err, user);
    });
});