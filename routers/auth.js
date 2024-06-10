const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
require("../db/conn");
const User = require("../models/userSchema");
// const authenticate=require("../middleware/authenticate");

// const Users = require("../models/userSchema");
const bcrypt = require('bcryptjs');
// ........cors..........
router.use(cors())
router.use(express.json())
router.use(bodyParser.urlencoded({ extended: true }))




router.use(express.json());
router.get("/", (req, res) => {
    res.send("hello from the server router");
})

// ....................using promises store the registration data in mongo db..................

// router.post("/register", (req, res) => {
//     const { name, email, phone, password, cpassword } = req.body;
//     if (!name || !email || !phone || !password || !cpassword) {
//         return res.json({ error: "please fill all fields" });
//     }
//     Users.findOne({ email: email }).maxTimeMS(15000).then((userExist) => {
//         if (userExist) {
//             return res.status(422).json({ error: "user already exist" });
//         }
//         const user = new User({ name, email, phone, password, cpassword });
//         user.save().then(() => {
//             res.status(201).send({ error: "Registration succesfully done" });
//         }).catch((err) => {
//             res.status(500).json({err:"failed to registered"});

//         })
//     }).catch((err)=>{
//         console.log(err);
//     })

// })

// ..................using async await strore the registration data in mongodb.......................

router.post("/register", async (req, res) => {

    const { name, email, phone, password, city, state} = req.body;
    if (!name || !email || !phone || !password || !city || !state) {
        return res.send({message:"please fill all fields"});
     
    }
    try {
        const userExist = await User.findOne({ email: email }).maxTimeMS(15000);
        console.log(userExist)

        if (!userExist) {
            const user = new User({ name, email, phone, password, city, state});
            await user.save();
            res.send({status:true,message:"user registration succesfully"});


        } else {
          res.send({message:"user already exist"});

        }
    } catch (err) {
        console.log(err);
    }

});
// .............login router...................
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let token;
        if (!email || !password) {
            res.send({message:"please fill the data"});
        }

        const userLogin = await User.findOne({email:email});
        console.log(userLogin);
        const isMatch = await bcrypt.compare(password, userLogin.password);
        token = await userLogin.generateAuthToken();
        console.log(token);

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 2592000000),
            httpOnly: true
        })
        if (!isMatch) {
            res.send({message:"Invalid credintials"});
        } else {
            res.send({status:true,message:"login successfully"});

        }


    } catch (error) {
        console.log(error);
    }


})



// ......contact data......
router.post("/contact", async(req,res)=>{
    // console.log(req.body)
    // console.log(req.body.name)
    // res.send("working")
try {
    const {name,email,subject,message}=req.body;
    if(!name||!email||!subject||!message){
        return res.send("please fill the contact form")
    }
    const userContact= await User.findOne({email:req.body.email})
    if(userContact){
        console.log(userContact)
        const userMessage= await userContact.addMessage(name,email,subject,message);
        await  userContact.save();
        res.send({message:"user contact succesfully"});
        // console.log(usermessage)

    }
} catch (error) {
    console.log("not working")
}
})




// ..........About us.............//
// router.get("/Aboutus" ,authenticate,(req, res) => {
//     res.send("it is about page");
//     console.log("hello my about page")
// })
module.exports = router;