const express = require("express");
const router = express.Router();

  router.get("/", (req, res) => {
  res.render("home.ejs");
});

router.get("/index.ejs", async (req, res) => {
  let alluser = await User.find();
  res.render("index.ejs", { alluser });
});

router.get("/index/new", (req, res) => {
  res.render("new.ejs");
});

router.get('/team.ejs', (req, res) => {
  res.render('team'); 
});

router.get('/home.ejs',(req,res)=>
  {
     res.render("home.ejs");
  });


router  .get('/login',(req,res)=>
    {
       res.render('login.ejs')
    });


  
  router  .get("/user/:id", async (req, res)=>{
      let {id} = req.params;
      let user = await User.findById(id).populate("reviews");
      if (!user) {
        return res.status(404).render("error", { message: "User nahi milraha hai sir" });
       }
      res.render("roomate.ejs",{user});
    });
 





module.exports = router;
