const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getProfile,
    getLeaderboard
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.get("/leaderboard", getLeaderboard);


module.exports = router;