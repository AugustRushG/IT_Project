// Import express
const express = require('express')

const bodyParser = require("body-parser")
const passport = require("passport")

// Import users.js
const users = require("./routes/api/users")

// Set app up as an express app
const app = express()

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// passport initialization
app.use(passport.initialize());

require("./config/passport")(passport);


//app.get('/', (req, res) => {
//    res.send('Our demo app is working!')
//});

//  use router
app.use("/api/users", users);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Demo app is listening on port 3000!')
});

require(`./models`)