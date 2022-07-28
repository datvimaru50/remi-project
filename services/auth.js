const jwt = require("jsonwebtoken");

const { User } = require("../models/user.js");
const ERROR = require("../types/error");

const register = async (email, password) => {
    const user = await User.findOne({ email });
    if (user) throw new Error(ERROR.EMAIL_EXISTED);
    const newUser = new User({
        email
    });
    newUser.generatePassword(password);
    return newUser.save();
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error(ERROR.EMAIL_NOT_EXISTED);
    if (!user.validatePassword(password)) {
        throw new Error(ERROR.PASSWORD_NOT_MATCHED);
    }
    return user;
};

const generateJWT = (user) => {
    const accessToken = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET
    );
    return accessToken;
};

const generateSession = (user) => {
    const accessToken = jwt.sign(
        { exp: Math.floor(Date.now() / 1000) + 60 * 10, email: user.email },
        process.env.JWT_SECRET
    );
    return accessToken;
};

module.exports = { register, login, generateJWT, generateSession };