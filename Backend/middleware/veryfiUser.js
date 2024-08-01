const jwt = require("jsonwebtoken");
const verifyUser = async (req, res, next) => {
    const token =
        req.cookies.Acessestoken ||
        req.body.Acessestoken;
     try {
			if (!token) {
				res.status(200).json({ massage: "not autorize ,please login" });
				return;
			}
			const decoad = jwt.verify(token, process.env.jwt_Secret);
			req.tokenvalueandid = decoad.userId;
			next();
		} catch (error) {
			res.status(400).json({ massage: "invalid token" });
		}
};

module.exports = verifyUser;