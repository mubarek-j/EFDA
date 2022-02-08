// verification code fixed
const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {

    const token = req.cookies.user_id;

    if (!token) return res.status(400).send("Invalid token");

    try {

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;

        next();
    }
    catch (error) {
        console.log(error);
        return res.redirect('/login');
    }

}