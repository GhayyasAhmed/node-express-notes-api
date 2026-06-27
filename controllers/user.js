
const User = require("../models/user");
const { setUser } = require("../utils/auth");
async function handleUserSignup(req, res, next) {
    try {
        const { name, email, password } = req.body;
        await User.create({
            name,
            email,
            password,
        });
        return res.redirect("/login");
    } catch (error) {
        return next(error);
    }
}

async function handleUserLogin(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ error: "Invalid Username or Password" });
        }
        const token = setUser(user)
        res.cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 3600000) }); // 1 hour expiration
        return res.redirect("/")
    } catch (error) {
        return next(error);
    }
}


module.exports = {
    handleUserSignup,
    handleUserLogin
};
