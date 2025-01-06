const express = require('express') // import express
const app = express() // creates an instance of express
const PORT = 3000 // sets the port of the local host we will be using

// sets up a root handler for the path "/" which is the roort url of the app
// req = request -> represents the incoming HTTP request
// res = response -> sends a response back to the client
app.get('/', (req, res) => { 
    res.send('Hello World') // sends a response to the client with the content "Hello World"
})

// starts the server and makes it listen for incoming HTTP requests at PORT (3000)
app.listen(PORT, () => {
    // gets executed once the server starts successfully and begins listening
    console.log(`App is listening at http://localhost:${PORT}`)
})

const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config')
const cors = require('cors')
require('dotenv').config();

app.use(cors()) // to allow cross origin requests
app.use(bodyParser.json()) // to convert the request into JSON
