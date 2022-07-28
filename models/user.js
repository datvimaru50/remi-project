const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        hash: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.generatePassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
        .toString("hex");
};

userSchema.methods.validatePassword = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
        .toString("hex");
    return hash === this.hash;
};

const User = mongoose.model("User", userSchema);

module.exports = { User, userSchema };