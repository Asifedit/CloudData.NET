const multer = require("multer");
const path = require("path");

// Define the directory for storing files
const publicDir = path.join(__dirname, "../public");
console.log(publicDir)
// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the directory to store the files
        cb(null, publicDir);
    },
    filename: (req, file, cb) => {
        // Generate a unique filename with a timestamp
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
// Create multer instance with the storage and file size limit
const upload = multer({
    storage: storage,
    limits: { fileSize: 30 * 1024 * 1024 }, // 30MB file size limit
});

// Log the multer configuration
console.log("Multer configured with storage and file size limits");

module.exports = upload;
