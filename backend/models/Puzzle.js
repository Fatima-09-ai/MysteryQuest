const mongoose = require("mongoose");

const puzzleSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    hint: {
        type: String,
        required: true
    },

    answer: {
        type: String,
        required: true
    },

    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        default: "Easy"
    },

    rewardPoints: {
        type: Number,
        default: 100
    },

    level: {
        type: Number,
        unique: true,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Puzzle", puzzleSchema);