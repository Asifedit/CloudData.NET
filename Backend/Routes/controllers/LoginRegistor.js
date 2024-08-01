const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const router = express.Router();

const options = {
    httpOnly: true,
    secure: true,
};

router.post("/resistor", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const Referencetoken = await jwt.sign(
            { username: username, userEmail: email },
            process.env.jwt_Secret
        );

        const creatUser = new User({
            username,
            password: hashedPassword,
            email,
            refToken: Referencetoken,
        });
        const Id_user = creatUser._id.toString();

        const Acessestoken = await jwt.sign(
            { userId: Id_user},
            process.env.jwt_Secret
        );
        await creatUser.save();
        res.status(200)
			.cookie("Acessestoken", Acessestoken, options)
			.cookie("Referencetoken", Referencetoken, options)
			.json({ message: "User created successfully", Acessestoken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error"});
    }
});

router.post("/login", async (req, res) => {
    const { username, password,email } = req.body;
    try {
        const user = await User.findOne({
            $or: [{ username}, { email }],
        });
        if (!user) {
            res.status(400).json({ message: "plese chack youre fiilled data" });
            return;
        }

        const chackPassword = await bcrypt.compare(password, user.password);
        if (chackPassword) {
            const Acessestoken = await jwt.sign(
				{ userid: user._id},
				process.env.jwt_Secret
			);
            res.cookie("Acessestoken", Acessestoken, options);
            res.status(200).json({ message: "login successfully" });
        }
    } catch (error) {
        console.error("Error creating user:", error);
    }
});

module.exports = router; 
