const express = require("express");
const router = express.Router();


const uploadRoutes = require("./controllers/UploadFile");
const resistor = require("./controllers/LoginRegistor")
const CRUD_Data = require("./controllers/CRUD_Data")

router.use(uploadRoutes);
router.use("/request",resistor);
router.use("/mydata", CRUD_Data);

module.exports = router;
