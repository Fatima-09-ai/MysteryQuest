const User = require("../models/User");

const getLeaderboard = async (req, res) => {
    try {

        const users = await User.find()
            .select("-password")
            .sort({ points: -1 });

        const leaderboard = users.map((user, index) => ({
            rank: index + 1,
            username: user.username,
            points: user.points,
            currentLevel: user.currentLevel
        }));

        res.json(leaderboard);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

module.exports = {
    getLeaderboard
};