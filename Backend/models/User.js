// models/User.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    refToken: {
        type: String,
    },
    profile: {
        type: String,
    },
    userData: {
        type: [
            {
                topic: {
                    type: String,
                    required: true,
                },
                value: {
                    type: String,
                    required: true,
                },
            }]
        
    },
});

module.exports = mongoose.model("User", UserSchema);
