const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserDataSchema = new Schema({
    User_ID: {
        type: String,
        require: true,
    },
    Datatopic: {
        type: String,
    },
    Datavalue: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model("UserData", UserDataSchema);
