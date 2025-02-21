const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const ACCESS_SECRET = process.env.JWT_SECRET ;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

let refreshTokens = []; 

// Register User
exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) return res.status(400).json({ error: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({ email, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully!", user: { id: newUser.id, email: newUser.email } });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

//Login User 
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const accessToken = jwt.sign({ userId: user.id }, ACCESS_SECRET, { expiresIn: "5m" });
        const refreshToken = jwt.sign({ userId: user.id }, REFRESH_SECRET, { expiresIn: "15m" });

        refreshTokens.push(refreshToken);
        res.json({ message: "Login successful", accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Refresh Token
exports.refreshToken = (req, res) => {
    const { token } = req.body;
    
    if (!token || !refreshTokens.includes(token)) return res.status(403).json({ error: "Invalid refresh token" });

    jwt.verify(token, REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid refresh token" });

        const newAccessToken = jwt.sign({ userId: user.userId }, ACCESS_SECRET, { expiresIn: "5m" });
        res.json({ accessToken: newAccessToken });
    });
};

// Logout 
exports.logout = (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.json({ message: "Logged out successfully" });
};
