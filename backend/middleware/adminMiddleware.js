const User = require("../models/User");

const admin = async (req, res, next) => {

    try {

        if (!req.user || !req.user._id) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // ONLY YOUR EMAIL CAN ACCESS ADMIN
        if (user.email !== "fatimahimama09@gmail.com") {
            return res.status(403).json({
                message: "Admin access only"
            });
        }

        next();

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }

};

module.exports = admin;