const express = require('express');

const router = express.Router();

const {
    register,
    login,
    generateJWT,
    generateSession,
} = require("../services/auth");

const ERROR = require("../types/error");

router.post("/register", (req, res) => {
    const { email, password} = req.body;
    register(email, password)
        .then((result) => {
            res.json({ success: true });
        })
        .catch((err) => {
            switch (err.message) {
                case ERROR.EMAIL_EXISTED:
                    res.status(409).json({ success: false, err: ERROR.EMAIL_EXISTED });
                    break;
                default:
                    res.status(500).json({ success: false, err: ERROR.INTERNAL_ERROR });
                    break;
            }
        });
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    login(email, password)
        .then((user) => {
            const token = generateJWT(user);
            const session = generateSession(user);
            res.json({
                user: user,
                token: token,
                session: session,
            });
        })
        .catch((err) => {
            res.status(401).json({ success: false, err: err.message });
        });
});

module.exports = router;