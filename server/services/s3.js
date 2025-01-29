// Import the AWS SDK (a tool that helps us talk to Amazon Web Services)
const AWS = require('aws-sdk')

// Load environment variables from a .env file (like secret keys) into the code


// Create a new S3 client (a connection to the cloud storage service S3)
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Get the AWS access key from the .env file
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Get the AWS secret key from the .env file
    region: process.env.AWS_REGION, // Set the region where your S3 bucket lives
})

// Get the name of the bucket (the folder in the cloud) from the .env file
BUCKET_NAME = process.env.BUCKET_NAME

// ---------------------- Upload an Image to S3 ----------------------
const uploadImage = async (fileName, fileContent) => {
    // Create the instructions for uploading a file to S3
    const params = {
        Bucket: BUCKET_NAME, // The name of the cloud folder
        Key: fileName, // The file’s path and name in the bucket (e.g., "user-id/image-name")
        Body: fileContent, // The actual file content (like the image data)
        ContentType: 'image/jpeg',  // Set the type of file (e.g., JPEG image); change if needed
    }
    // Upload the file to S3 and return the result (like the URL to the uploaded file)
    return s3.upload(params).promise()
}

// ---------------------- Delete an Image from S3 ----------------------
const deleteImage = async (fileName) => {
    // Create the instructions for deleting a file from S3
    const params = {
        Bucket: BUCKET_NAME, // The name of the cloud folder
        Key: fileName, // The file’s path and name in the bucket (e.g., "user-id/image-name")
    }
    // Delete the file from S3 and return the result
    return s3.deleteObject(params).promise()
}

// Export these functions so other files can use them (e.g., uploading and deleting images)
module.exports = { uploadImage, deleteImage }
