const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require("./views/roomfinder.js");
const Review = require("./views/review.js");
const path = require('path');
// const chat = require('./views/chat.js');
const methodoverride = require('method-override');
const multer = require('multer');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const auth = require('./views/signed.js');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const { maxHeaderSize } = require('http');
const {listingSchema} = require('./schema.js');
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require('./utils/ExpressError.js');
// const users = require('./routes/user.js');
const cookieParser = require('cookie-parser');



app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));
app.engine('ejs', ejsMate);
app.use(cookieParser());



 
main().then((res)=>{
  console.log("connected");
}).catch((err)=>{
  console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    console.log("connected to mongodb");
 
};

let Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(file.fieldname === "room")
    {
      cb(null, 'public/roomimage/');
    }
    else{
    cb(null, 'public/usersimage/');
    }
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname);
  }
});

let upload = multer({ storage: Storage });



const sessionOption = {
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires: new Date() + 7*24*60*60*1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,

  },
};


 app.use(session(sessionOption));
 app.use(flash());
app.use(passport.initialize());
app.use(passport.session());  
passport.use(new LocalStrategy(auth.authenticate()));

passport.serializeUser(auth.serializeUser());
passport.deserializeUser(auth.deserializeUser());









const validateuser = (req, res)=>{
  let {error} = user.Schema.validate(req.body);
  
  if(error)
  {  let errMsg = error.details.map((el)=> el.message).join(",");
    throw new ExpressError(400,result.errMsg);
  }
  else{
    next();
  }
};
const validateReview  = (req, res)=>{
  let {error} = review.Schema.validate(req.body);
  
  if(error)
  {  let errMsg = error.details.map((el)=> el.message).join(",");
    throw new ExpressError(400,result.errMsg);
  }
  else{
    next();
  }
};



app.post('/login',passport.authenticate('local',{ failureRedirect : '/login',failureFlash: true}) ,async (req,res)=>{
  try{
   req.flash("success", "Welcome back!");
   res.redirect('/question.ejs');
  }catch(e){
   req.flash("error", "Invalid Credentials");
   console.log("Flash Error Set:", req.flash('error'));
   res.redirect('/login');
  }

});



app.get("/signup",(req,res)=>{
   res.render("signup.ejs");
});

app.post("/signup", async(req,res)=>{
try{
 let {username,password,email} = req.body;
 const newUser = new  auth({username,email});
 const registeredUser = await auth.register(newUser,password);
 console.log(registeredUser);
 req.login(registeredUser,(err)=>{
  if(err)
  {
    return next(err);
  }
  req.flash("success","Registered successfully");
 res.redirect("/question.ejs");

 })
 
} catch(e){
 req.flash("error", e.message);
 res.redirect("/signup");
}
})









app.get('/cookie',(req,res)=>{
  res.cookie("test","hello");
  res.send("cookie set");
})






app.use((req,res,next)=>
{
   res.locals.success = req.flash("success");
   res.locals.error = req.flash("error");
   next();
});


app.get('/',(req,res)=>{
  console.dir(req.cookies);
  res.render("login.ejs"); 
  
});

app.delete('/index/:id',async (req,res)=>
  {
    let {id} = req.params;
    let deletedchat = await User.findByIdAndDelete(id);
    console.log(deletedchat);
    res.redirect("/index.ejs"); 
  });


  app.get('/question',(req,res)=>
    {
         res.render("question.ejs");
    }); 



    app.get('/home',(req,res)=>
      {
           res.render("home.ejs");
      });

  

  // update route
  app.put("/index/:id",async (req, res)=>{
    let {id} = req.params;
    let {message: new_msg} = req.body;
    let chats = await User.findByIdAndUpdate(id,{message: new_msg},{runValidators: true,new: true});
    console.log(chats);
    res.redirect("/index.ejs");

  });



app.get('/register', (req, res) => {
  res.render('register'); 
});




app.get('/team.ejs', (req, res) => {
  res.render('team'); 
});



app.get('/home.ejs',(req,res)=>
{
   res.render("home.ejs");
});



app.get('/index.ejs', async (req, res)=>{
  let alluser = await User.find();
   res.render("/room",{alluser});

  });

  app.get('/login',(req,res)=>
    {
       res.render('login.ejs')
    });



  app.get('/index/new', (req, res) => {
    console.log(req.auth); 
  
    if (!req.isAuthenticated()) {
        req.flash('error', "You must be logged in");
        return res.redirect("/login");  
    }
    
   
    res.render("new.ejs");
});




app.get("/logout",(req, res,next) =>{
  req.logout((err)=>{
    if(err)
    {
      next(err);
    }
    req.flash('success',"now you logged out");
    res.redirect("home.ejs");
    })
});







    

    app.get('/roomate',(req,res)=>
      {
           res.render("roomate.ejs");
      });


      app.get("/user/:id", async (req, res)=>{
        let {id} = req.params;
        let user = await User.findById(id).populate("reviews");
        if (!user) {
          return res.status(404).render("error", { message: "User nahi milraha hai sir" });
         }
        res.render("roomate.ejs",{user});
      });

// app.use("/users",users);




      app.post('/index', upload.fields([
        { name: 'room', maxCount: 1 },
        { name: 'image', maxCount: 1 }
    ]), (req, res) => {
        let { first_name, last_name, gender, vacant, state, city, phone, email, age, pin,budget,description } = req.body;


        const userImage = req.files['image'] ? `usersimage/${req.files['image'][0].filename}` : 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg';
        const roomImage = req.files['room'] ? `roomimage/${req.files['room'][0].filename}` :  'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg';
       
        // Create new user
        const newUser = new User({
            first_name: first_name,
            last_name: last_name,
            gender: gender,
            vacant: vacant, 
            state: state,
            city: city,
            phone: phone,
            email: email,
            age: age,
            pin: pin,
            budget: budget,
            description: description,
            image: userImage,
            room: roomImage,
        });
      
        // Save the new user to the database  
        newUser.save()
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send('Error registering user');
            });
            req.flash("success","New Listing is Add successfully");
          res.redirect('/index.ejs');
      });
      


      // reviews
app.post('/submit/:userId/review',validateReview, wrapAsync(async(req, res)=>
  {
     let user= await User.findById(req.params.userId);
     let newReview = new Review(req.body.review);
  
     user.reviews.push(newReview);
     await newReview.save();
     await user.save();
     console.log("new review save");
     res.send(newReview);
    
  }
  ));

  


  app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
  });
  
  app.use((err,req,res,next)=>{
    let {statusCode =500, message="Something went wrong!"} = err;
    res.render('error.ejs');
    // res.status(statusCode).send(message);
  });
  app.listen(8080, ()=>
    {
        console.log("server is running on port 8080");
     
    });

   


























