const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const User = require("../../models/User")


const publicDir = path.join(__dirname, "../../public");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, publicDir); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, "File_Data_" + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });


router.post("/file", upload.single("avatar"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = path.join(publicDir, req.file.filename);
    console.log("File path:", filePath);

    res.status(200).json({
        message: "File uploaded successfully",
        file: req.file,
    });

    setTimeout(() => {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Failed to delete file:", err);
            } else {
                console.log("File deleted:", filePath);
            }
        });
    }, 5000);
});

module.exports = router;
