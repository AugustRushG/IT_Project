// Import express
const express = require('express')

const bodyParser = require("body-parser")
const passport = require("passport")

// Import users.js
const usersRouter = require("./routes/api/users")

// Set app up as an express app
const app = express()

const cors = require('cors');
const corsOptions = {
    credentials:true,
    origin:'http://localhost:3000',
    optionsSuccessStatus:200
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// passport initialization
app.use(passport.initialize());

require("./config/passport")(passport);


//app.get('/', (req, res) => {
//    res.send('Our demo app is working!')
//});

//  use router
app.use("/api/users", usersRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Demo app is listening on port 8080!')
});

require(`./models`)