const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    puzzleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Puzzle"
    },

    score: Number,

    completedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Score", scoreSchema);