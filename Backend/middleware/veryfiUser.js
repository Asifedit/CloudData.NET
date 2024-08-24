const jwt = require("jsonwebtoken");
const { refresAccesAndRefToken } = require("../utils/genatatToken");

const verifyUser = async (req, res, next) => {
    const Acessestoken = req.cookies.Acessestoken || req.body.Acessestoken;
    try {
        if (!Acessestoken) {
            res.status(400).json({ massage: "not autorize, please login" });
            return;
        }
        const decoad = jwt.verify(Acessestoken, process.env.jwt_Secret);
        req.tokenvalueandid = decoad.userId || decoad.userid;
        next();
    } catch (error) {
        console.log(error);
        if (error.expiredAt) {
            const data = await refresAccesAndRefToken(Acessestoken);
            req.tokenvalueandid = data.id;
            res.status(200)
                .cookie("Acessestoken", data.Acessestoken, {
                    httpOnly: true,
                    secure: true,
                })
                .cookie("Referencetoken", data.Referencetoken, {
                    httpOnly: true,
                    secure: true,
                });
            next(); 
            return;
        }
        res.status(404).json({ message: "Modification not Allow  Re-Login " });
    }
};
module.exports = { verifyUser };
