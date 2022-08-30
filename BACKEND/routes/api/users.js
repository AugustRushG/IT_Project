// @login & register
const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const keys = require("../../config/keys")
const passport = require("passport")

const User = require("../../models/user")

// $route GET api/users/test
// @desc return res json data
// @access public
router.get("/test", (req, res) => {
    res.json({msg:"login works"})
})

// $route POST api/users/register
// @desc return res json data
// @access public
router.post("/register", (req, res) => {
    // console.log(req.body);

    //if username already in the database
    User.findOne({username:req.body.username}).then((user) => {
        if(user){
            return res.status(400).json({username:"username already exists!"})
        }else{
            const newUser = new User({
                username:req.body.name,
                password:req.body.password,
                secret_one:req.body.secret_one
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

router.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
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


// $route GET api/users/current
// @desc return current user
// @access private
router.get("/current",passport.authenticate("jwt", {session:false}), (req,res) => {
    res.json({
        id:req.user.id,
        username:req.user.username
    });
})

module.exports = router;