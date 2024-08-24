const jwt = require("jsonwebtoken");
const User = require("../models/User");
// const GenaratAccessToken = (token) => {
//     console.log(token);
// };

// const GenatatReferencetoken = async (token) => {
//     const Acessestoken = await jwt.sign(
//         { userid: user._id },
//         process.env.jwt_Secret,
//         { expiresIn: "1s" }
//     );
//     console.log(token);
// };

const refresAccesAndRefToken = async (palode) => {
    console.log("req come ");
    const decoded = jwt.decode(palode);
    console.log(decoded);
    try {
        const Acessestoken = jwt.sign(
            { userid: decoded.userid, username: decoded.username },
            process.env.jwt_Secret,
            { expiresIn: "1d" }
        );
        const Referencetoken = jwt.sign(
            { userid: decoded.userid },
            process.env.jwt_Secret
        );
        const user = await User.findByIdAndUpdate(
            decoded.userid,
            {
                refToken: Referencetoken,
            },
            { new: true }
        );
        return { Acessestoken, Referencetoken, id: user._id };
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    refresAccesAndRefToken,
};
