const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
    try {
        //  const token = await req.cookies.token;
        const token = await req.cookies.token;
        console.log(token);

        if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

        const verified = await jwt.verify(token, 'fZJ9K9c55hS(y7Qt)YB5QSq$kp9TP&_w%!(5v8&aVHM3E)j7n');
        req.user = verified.user;

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ ErrorMessage: "Unauthorized" });
    }
}

module.exports = auth;