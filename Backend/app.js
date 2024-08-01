const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, "public");
const userRoutes = require("./Routes/routes");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }
    next();
});
app.use("/api", userRoutes);

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
    })
    .catch((error) => handleError(error));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
