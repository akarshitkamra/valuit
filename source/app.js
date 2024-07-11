require('dotenv').config()
const express=require('express')
const bodyParser = require('body-parser')
const app=express()
const PORT= process.env.PORT
const mongoose=require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')
const flash = require("connect-flash")
const passport = require('passport')
const expressSanitizer = require('express-sanitizer')
const moment = require('moment')

console.log(process.env);

mongoose.connect(process.env.MONGOOSE_URL).then(()=>{
    console.log('DB connected')
}).catch(e=>{
    console.log("Error while connecting DB. ")
})

app.use(cors())
app.use(cookieParser());
app.use(session({
    saveUninitialized: false,
    resave: false,
//    key: "1najiadh13813y13",
//    secret: "adadaj242424",
    key: process.env.KEY,
    secret: process.env.SECRET,
    secure: true,
    httpOnly: true,
    store:  MongoStore.create({ 
        mongoUrl: process.env.MONGOOSE_URL,
        ttl: 7 * 24 * 60 * 60,
        autoRemove: 'native',
        collection: 'sessions', //Collection Name
        touchAfter: 12 * 3600 // Optional
    }),
    cookie: { maxAge: 60000 }
}));

app.set('view engine','html')
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(expressSanitizer());

// Auth
require('./auth');

app.use(function(req, res, next){
    res.locals.moment=moment
    res.locals.currentUser = req.user || null;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});



var adminRoutes = require('./routes/admin');
var userRoutes = require('./routes/user');

// Routes

//admin routes
app.use('/userlistpanel', adminRoutes);

// user routes
app.use('/', userRoutes)

app.get('*', (req, res) => {
    res.sendStatus(404)
})

app.listen(PORT,()=>{
    console.log("Server is running on port 3000")
})
