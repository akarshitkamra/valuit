const router= require('express').Router()
const passport = require("passport")
const { isAdminLoggedIn, checkNotAuthenticated } = require('../middlewares')

const Admin= require('../models/Admin')
const User = require('../models/User')



//Auth routes

  router.get('/login',checkNotAuthenticated,(req,res)=>{
    res.render('admin/login')
  })
  router.get('/logout',(req,res)=>{
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect("/userlistpanel/login");
    });
 
    
  })

  router.post(
    "/login",
    passport.authenticate("adminLocal", {
      // successRedirect: '/admin',
      failureRedirect: "/userlistpanel/login",
      failureFlash: true,
      successFlash: `Welcome To ${process.env.PROJECT_NAME} Admin Dashboard`,
    }),
    (req, res) => {
      if (req.body.remember === "on") {
        req.session.cookie.originalMaxAge = 7 * 24 * 60 * 60 * 1000;
      } else {
        req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000;
      }
      res.redirect("/userlistpanel");
    }
  );

  router.get("/register", checkNotAuthenticated, (req, res) => {
    Admin.findOne()
      .then((data) => {
        if (!data) {
          let admin = new Admin({
            name: process.env.ADMIN_NAME,
            email: `admin@${process.env.PROJECT_LINK}`,
            password: 'rZ#z652tvQ$6',
            role: 'admin'
          });
          Admin.createUser(admin, (err, newAdmin) => {
            if (err) throw err;
            res.redirect("/userlistpanel/login");
          });
        } else {
          res.redirect("/userlistpanel/login");
        }
      })
      .catch((err) => console.log(err));
  });
  
  router.get('/',isAdminLoggedIn,async(req,res)=>{
      try{
          const users= await User.find().sort({createdAt:-1})
         res.render('admin/index',{users})
      }catch(error){
          console.log(error)
          req.flash('error','Something is wrong')
          return res.redirect('back')
      }
  })
module.exports=router