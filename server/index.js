const express = require('express') // import express
const app = express() // creates an instance of express
const bodyParser = require('body-parser');
const mongoose = require('mongoose') //imports mongoose
const { PORT, mongoUri } = require('./config') // imports PORT and mongoUri from config file
const cors = require('cors') //imports CORS for making reqests across different servers
require('dotenv').config(); // imports dotenv

// sets up a root handler for the path "/" which is the roort url of the app
// req = request -> represents the incoming HTTP request
// res = response -> sends a response back to the client
app.get('/', (req, res) => { 
    res.send('Hello World') // sends a response to the client with the content "Hello World"
})

app.use(cors()) // to allow cross origin requests
app.use(bodyParser.json()) // to convert the request into JSON

mongoose
    .connect(process.env.MONGO_URI) //connects our application to a mongoDB database
    .then(() => console.log('MongoDB database Connected...')) // then() is executed when the server is connected
    .catch((err) => console.log(err)) // handles error if connection fails

app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`)) // starts the express erver
