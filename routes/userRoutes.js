const express = require("express");
const { register, login, refreshToken, logout } = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.delete("/logout",logout);

module.exports = router;
