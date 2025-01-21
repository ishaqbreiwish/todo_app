const { Schema, model } = require('mongoose')

const TodoSchema = new Schema({ // defines schema
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String, // URL of the uploaded image
        required: false,
    },
})

const Todo = model('todo', TodoSchema)
module.exports = Todo
