const mongoose = require('mongoose') //imports mongoose
const { PORT, mongoUri } = require('./config') // imports PORT and mongoUri from config file
const cors = require('cors') //imports CORS for making reqests across different servers
require('dotenv').config(); // imports dotenv

app.use(cors()) // to allow cross origin requests
app.use(bodyParser.json()) // to convert the request into JSON

mongoose
    .connect(process.env.MONGO_URI, { //connects our application to a mongoDB database
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(() => console.log('MongoDB database Connected...'))
    .catch((err) => console.log(err))

app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`))
