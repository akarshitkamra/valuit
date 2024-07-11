const router= require('express').Router()
const Newsletter = require('../models/Newsletter')
const User = require('../models/User')
const ejs=require('ejs')
const nodemailer=require('nodemailer')  
//transporter
let transpoter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS

    }
})

router.get('/',(req,res)=>{
   return res.sendFile('/home/ec2-user/apps/valuit/dark/source/views/index.html');
})

router.get('/exchange',(req,res)=>{
   return res.sendFile('/home/ec2-user/apps/valuit/dark/source/views/exchange.html');
})

router.get('/tokenHub',(req,res)=>{
   return res.sendFile('/home/ec2-user/apps/valuit/dark/source/views/tokenHub.html');
})

router.get('/contactUs',(req,res)=>{
   return res.sendFile('/home/ec2-user/apps/valuit/dark/source/views/contactUs.html');
})

router.get('/about',(req,res)=>{
   return res.sendFile('/home/ec2-user/apps/valuit/dark/source/views/about.html');
})

router.get("/company",(req,res)=>{
   return res.render('user/company')
})

router.get('/privacy',(req,res)=>{
   return res.render('user/privacy')
})

router.get('/disclaimer',(req,res)=>{
   return res.render('user/disclaimer')
})

router.get('/terms',(req,res)=>{
   return res.render('user/terms')
})
router.post('/download-whitepaper',async(req,res)=>{
   const {name,email}=req.body
   try{
       if(name && email){
           await User.create({name,email})
           ejs.renderFile('./views/user/email.ejs',{
               name,email
           },async function(err,data){
               if(err){
                   throw err
               }
               await transpoter.sendMail({
                   from: process.env.SENDER,
                   to: process.env.RECEIVER,
                   subject:'New white paper downloaded on Valuit.',
                   html: data,
                   text: `Name:${name} Email:${email}`
               })
               console.log('Email sent successfully.')
           })
           return res.status(200).json("success")    
       }else{
          return res.status(400).json('Please provide email and name')
       }
   }catch(e){
       console.log(e)
       return res.status(500).json('Something is wrong')
   }
})


router.post('/newsletter/subscribe',async(req,res)=>{
   try{
       const user=await Newsletter.findOne({
           email:req.body.email
       })
       if(user){
           return res.status(400).json("Email address already subscibe with us.")
       }
       await Newsletter.create({
           email:req.body.email
       })
       return res.status(200).json('success')
   }catch(e){
       console.log(e)
       return res.status(500).json('Something is wrong')
   }
})

module.exports=router
