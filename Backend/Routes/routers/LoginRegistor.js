const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const options = {
	httpOnly: true,
	secure: true,
};

const Resistor = async (req, res) => {
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
			{ userId: Id_user },
			process.env.jwt_Secret
		);
		await creatUser.save();
		res.status(200)
			.cookie("Acessestoken", Acessestoken, options)
			.cookie("Referencetoken", Referencetoken, options)
			.json({ message: "User created successfully", Acessestoken })
	} catch (error) {
		console.error("resistor error from server", error);
		res.status(500).json({ message: "Server error" });
	}
};

const login = async (req, res) => {
	const { username, password, email } = req.body;
	console.log(req.body)
	try {
		const user = await User.findOne({
			$or: [{ username }, { email }],
		});
		if (!user) {
			res.status(400).json({ message: "Username or Password not Found" });
			return;
		}
		const chackPassword = await bcrypt.compare(password, user.password);
		if (!chackPassword) {
			res.status(400).json({ message: "Username or Password not Found" });
			return
		}
        if (chackPassword) {
            const Referencetoken = user.refToken;
			const Acessestoken = jwt.sign(
				{ userid: user._id,username:user.username},
				process.env.jwt_Secret,{expiresIn:"1d",}
			);
			res.status(200)
				.cookie("Acessestoken", Acessestoken, options)
				.cookie("Referencetoken", Referencetoken,options)
				.json({ message: "login successfully" ,Acessestoken:Acessestoken});
		}
	} catch (error) {
		res.status(500).json({ message: "not login dew to server error" });
		console.error("Error creating user:", error);
	}
};

const logout = (req, res) => {
	res.clearCookie("Acessestoken");
	res.status(200).json({ message: "logout successfully" });
};

function ChangrTokenReferencetoken(req, res, Referencetoken){
    console.log(Referencetoken);
};
module.exports = { Resistor, login, logout, ChangrTokenReferencetoken };
