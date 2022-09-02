// @login & register
const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const keys = require("../config/keys")
const passport = require("passport")
//const isAuthenticated = require("../middleware")
const User = require("../models/user")

/*
const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(404).json({msg:"Unauthorized: Invalid token"})
    }
    return next()
}
*/

var currCon = false;

const checkAvai = () => {
    if (currCon == true) {
        return next()
    } else {
        res.status(404).json({msg:"Not Authorized"})
    }
}

// $route POST api/users/register
// @desc return res json data
// @access public
router.post("/register", (req, res) => {
    //if username already in the database
    User.findOne({username:req.body.user}).then((user) => {


        if(user){
            
            return res.status(409).json({username:"username already exists!"})
        }else{
           
            const newUser = new User({
                username:req.body.user,
                password:req.body.pwd,
                secret_one:req.body.questionAnswer
            })

            bcrypt.genSalt(10, function(err, salt) {
               
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    
                    if(err) throw err;

                    newUser.password = hash;

                    newUser.save().then(user => res.json(user)).catch(err => console.log(err));
                });
            });

        }
    })
})

// $route POST api/users/login
// @desc return token jwt passport
// @access public

<<<<<<< HEAD
router.post("/login",passport.authenticate("jwt", {session:false}), (req,res) => {
    
=======
router.post("/login", (req,res) => {
>>>>>>> 46db9d952937c3ecbf0a3763e0bdc17d1180348d
    const username = req.body.user;
    const password = req.body.pwd;
    //search the db
   
    User.findOne({username}).then(user => {
        if(!user){
            return res.status(404).json({username:"user not exist!"});
        }

        //password matching
        // Load hash from your password DB.
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch){
                const rule = {id:user.id,name:user.username};
                // secret
                jwt.sign(rule, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
                    if(err) throw err;
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                })
                // res.json({msg:"success"});
            }else{
                return res.status(400).json({password:"password error!"});
            }
        })
    })

})


// $route GET api/users/checkToken
// @access private
router.get("/checkToken",passport.authenticate("jwt", {session:false}), (req,res) => {
    res.sendStatus(200);
})


// $route GET api/users/authorizeeUser
router.get("/authorizeUser", (req,res) => {
    const username = req.body.user;
    const answer = req.body.questionAnswer;

    User.findOne({username}).then(user => {
        if(!user){
            return res.status(404).json({username:"user not exist!"});
        }

        if(user.secret_one != answer){
            return res.status(404).json({secret_one:"Incorrect Answer!"});
        }else{
            currCon = true;
            res.send("success");
            //res.json({msg:"success"});
        }
    })
})

// $route GET api/users/resetpwd
router.post("/resetpwd", checkAvai, (req,res) => {
    const password = req.body.pwd;
    User.findOne({username}).then(user => {
        if(!user){
            return res.status(404).json({username:"user not exist!"});
        }
        currCon = false;
        bcrypt.genSalt(10, function(err, salt) {
                
            bcrypt.hash(password, salt, (err, hash) => {
                
                if(err) throw err;

                user.password = hash;

                user.save().then(user => res.json(user)).catch(err => console.log(err));
            });
        });
    })
})

// $route GET api/users/logout
// @desc return current user
// @access private
router.post("/logout", passport.authenticate("jwt", {session:false}), (req,res) => {
    req.logout();
})

module.exports = router;

