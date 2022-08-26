// Import express
const express = require('express')

// Set app up as an express app
const app = express()

app.get('/', (req, res) => {
    res.send('Our demo app is working!')
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Demo app is listening on port 3000!')
});