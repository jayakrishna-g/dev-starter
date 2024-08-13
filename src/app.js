const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const chocoRouter = require('./routes/chocoRouter');
const DataBase = require('./utils/database');
const homebrewRouter = require('./routes/homebrewRouter');

const app = express();

app.get("/",(req,res,next) => {
    const userAgent = req.headers['user-agent'];
    console.log("User-Agent:", userAgent);
    next();
})

// Serve the static files from the 'out' directory
app.use(express.static(path.join(__dirname, '../client/out')));

// Use body-parser middleware
app.use(bodyParser.json());

// Define API routes
app.use('/api/chocoscrapper', chocoRouter);
app.use('/api/homebrewscrapper', homebrewRouter);

DataBase.InitDB(app);

// Handle React routing, return all requests to React app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/out', 'index.html'));
// });

module.exports = app;   
