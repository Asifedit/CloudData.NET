const User = require("../../models/User");
const UserData = require("../../models/DATA_User");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const { encrypt, decrypt } = require("../../utils/crypto");
// Route to add user data
const addTextData = async (req, res) => {
    const { title, content } = req.body;
    const UserID = req.tokenvalueandid;
    try {
        // const user = await User.findById(UserID)
        // if (!user) {
        //     res.status(400).json({ message: "Bad Request please login fast" });
        //     return;
        // }
        const userData = await UserData({
            User_ID: UserID,
            Datatopic: encrypt(title),
            Datavalue: encrypt(content),
        }).save();
        console.log(userData);
        res.status(200).json({ message: "Data added successfully" });
    } catch (error) {
        console.error("Error from /addTextData user:", error);
        res.status(500).json({ message: "Server error found" });
    }
};

//upload file on cloudinary
const addFileData = async (req, res) => {
    const { filenamedata } = req.body;
    const UserID = req.tokenvalueandid;
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const publicFilePath = path.join(
        __dirname,
        `../../public/${req.file.filename}`
    );
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const customFileName = `CloudData.NET_${req.file.size}_${Date.now()}`;
    const fileName = filenamedata || `customFileName${Date.now()}`;
    try {
        const user = await User.findById(UserID);
        if (!user) {
            return res.status(400).json({ message: "User needs to log in" });
        }

        const publicId = customFileName;
        const result = await cloudinary.uploader.upload(publicFilePath, {
            public_id: publicId,
            overwrite: true,
        });

        if (!result.url) {
            res.status(500).json({ message: "Something went wrong, please try again" });
            return
        }
        await new UserData({
            User_ID:UserID,
            Datatopic: encrypt(fileName),
            Datavalue: encrypt(result.url),
     }).save();
        
        res.status(200).json({ message: "Your file stored successfully" });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Error uploading file" });
    } finally {
        fs.unlink(publicFilePath, (err) => {
            if (err) {
                console.error("Error removing file:", err);
            }
        });
    }
};

// Route to delete user data
const deleteData = async (req, res) => {
    const { id } = req.params;
    const UserID = req.tokenvalueandid;
    try {
        const user = await UserData.findOneAndDelete({
            _id: id,
            User_ID: UserID,
        });
        if (!user) {
            return res
                .status(404)
                .json({ message: "Data not found or unauthorized access" });
        }
        res.status(200).json({ message: "Data deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error("Error deleting data:", error);
    }
};


// Router to fatch all data
const readallData = async (req, res) => {
    const UserID = req.tokenvalueandid;
    try {
        const user = await UserData.find({ User_ID: UserID });
        if (!user) {
            res.status(400).json({ message: "Bad Request please login fast" });
            return;
        }
        const data = await Promise.all(
            user.map(async (e) => {
                const Datavalue = await decrypt(e.Datavalue);
                const Datatopic = await decrypt(e.Datatopic);
                const _id = await e._id;
                return { Datavalue, Datatopic, _id };
            })
        );
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.log("the errot to fatch data ", error);
    }
};

// update existing data
const updateData = async (req, res) => {
    const { Datatopic, Datavalue } = req.body;
    const UserID = req.tokenvalueandid;
    const itemId = req.params.id;
    if (!Datatopic || !Datavalue) {
        return res
            .status(400)
            .json({ message: "Please fill in all required fields" });
    }
    try {
        const updatedUserData = await UserData.findOneAndUpdate(
            { _id: itemId, User_ID: UserID },
            {
                Datatopic: Datatopic,
                Datavalue: Datavalue,
            },
            { new: true }
        );
        if (!updatedUserData) {
            return res
                .status(404)
                .json({ message: "Data not found or unauthorized access" });
        }
        res.status(200).json({
            message: "Data updated successfully",
            data: updatedUserData,
        });
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).json({ message: "Server error" });
    }
};




module.exports = {
    addTextData,
    addFileData,
    deleteData,
    readallData,
    updateData,
};
