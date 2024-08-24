const express = require("express");
const router = express.Router();
const { verifyUser } = require("../middleware/veryfiUser");
const { Resistor, login, logout } = require("./routers/LoginRegistor");
const upload = require("../middleware/multerConfig");
const {
    addFileData,
    addTextData,
    deleteData,
    updateData,
    readallData,
} = require("./routers/CRUD_Data");

router.get("/data/read", verifyUser, readallData);
router.post("/data/add/file", verifyUser, upload.single("file"), addFileData);
router.post("/data/add/text", verifyUser, addTextData);
router.post("/data/update/:id", verifyUser, updateData);
router.delete("/data/deleate/:id", verifyUser, deleteData);

router.post("/resistor", Resistor);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
