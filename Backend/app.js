const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 9000;
const userRoutes = require("./Routes/main.routes");

app.use(
    cors({
        origin:*,
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req,res,next) => {
	console.log("user request details", {
        ip: req.ip,
        from: req.headers.origin,
        for: req.url,
        protocol: req.protocol,
		secure: req.secure,
		
    });
	next()
})
app.use("/api/request", userRoutes);

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
	})
	.catch((error) => handleError(error));

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
