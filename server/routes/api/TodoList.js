// Import the Router tool from Express, which helps us create routes (like paths for API endpoints)
const { Router } = require('express')

// Import the Todo model, which represents tasks in our database
const Todo = require('../../models/Todo.js')

// Import multer, a helper that handles uploading files (like pictures)
const multer = require('multer')

// Import custom functions for uploading and deleting images from S3 (our cloud photo album)
const { uploadImage, deleteImage } = require('../../services/s3')

// Initialize multer so it’s ready to handle file uploads
const upload = multer()

// Create a new router ( for handling API requests)
const router = Router()

// ---------------------- Create a Todo with an image ----------------------
// When someone sends a POST request to this route ('/'), add a new task
router.post('/', upload.single('image'), async (req, res) => {
    try {
        let imageUrl = null;

        if (req.file) {
            const uploadResult = await uploadImage(`todos/${req.file.originalname}`, req.file.buffer);
            imageUrl = uploadResult.Location;
            console.log("Uploaded Image URL:", imageUrl); // Log the S3 URL
        }

        const newTodo = new Todo({
            ...req.body,
            image: imageUrl, // Save the image URL
        });

        const todo = await newTodo.save();
        console.log("Saved Todo with Image:", todo); // Log the saved todo
        res.status(200).json(todo);
    } catch (error) {
        console.error("Error in POST /todos:", error.message);
        res.status(500).json({ message: error.message });
    }
});


// ---------------------- Delete a Todo and its image ----------------------
// When someone sends a DELETE request to this route ('/:id'), remove a task by its ID
router.delete('/:id', async (req, res) => {
    try {
        // Find the task in the database using the ID from the URL
        const todo = await Todo.findById(req.params.id)

        // If the task doesn't exist, throw an error
        if (!todo) throw new Error('Todo not found')

        // If the task has an image, delete it from S3
        if (todo.image) {
            // Extract the image filename from the S3 URL and delete it
            await deleteImage(`todos/${todo.image.split('/').pop()}`)
        }

        // Delete the task from the database
        const removed = await Todo.findByIdAndDelete(req.params.id)

        // If everything works, send back the deleted task as a response
        res.status(200).json(removed)
    } catch (error) {
        // If there's an error, respond with a 500 status code (server error) and the error message
        res.status(500).json({ message: error.message })
    }
})

// Export the router so we can use it in other parts of the app
module.exports = router
