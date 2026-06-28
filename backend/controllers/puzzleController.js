const Puzzle = require("../models/Puzzle");

// Get all puzzles
// const getPuzzles = async (req, res) => {
//     try {
//         const puzzles = await Puzzle.find().sort({ level: 1 });

//         console.log("Puzzles:", puzzles);

//         res.json(puzzles);

//     } catch (err) {
//         console.error(err);

//         res.status(500).json({
//             message: err.message
//         });
//     }
// };
const mongoose = require("mongoose");

const getPuzzles = async (req, res) => {
    try {

        const puzzles = await Puzzle.find().sort({ level: 1 });

        console.log("Sending puzzles:", puzzles.length);

        res.json(puzzles);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: err.message
        });

    }
};


const solvePuzzle = async (req, res) => {

    try {

        const { answer } = req.body;

        const puzzle = await Puzzle.findById(req.params.id);

        if (!puzzle) {
            return res.status(404).json({
                message: "Puzzle not found"
            });
        }

        if (
            answer.trim().toLowerCase() ===
            puzzle.answer.toLowerCase()
        ) {

            const user = await User.findById(req.user._id);

            user.points += puzzle.rewardPoints;
            user.currentLevel += 1;
            user.completedPuzzles += 1;

// First Puzzle
if (
    user.completedPuzzles >= 1 &&
    !user.achievements.includes("First Puzzle Solved")
) {
    user.achievements.push("First Puzzle Solved");
}

// Beginner
if (
    user.completedPuzzles >= 3 &&
    !user.achievements.includes("Detective Beginner")
) {
    user.achievements.push("Detective Beginner");
}

// Puzzle Solver
if (
    user.completedPuzzles >= 5 &&
    !user.achievements.includes("Puzzle Solver")
) {
    user.achievements.push("Puzzle Solver");
}

// Expert
if (
    user.completedPuzzles >= 8 &&
    !user.achievements.includes("Detective Expert")
) {
    user.achievements.push("Detective Expert");
}

// Master Detective
if (
    user.completedPuzzles >= 11 &&
    !user.achievements.includes("Master Detective")
) {
    user.achievements.push("Master Detective");
}

            await user.save();

            return res.json({
                success: true,
                message: "Correct Answer!",
                points: user.points,
                currentLevel: user.currentLevel
            });

        }

        res.status(400).json({
            success: false,
            message: "Wrong Answer"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Get one puzzle
const getPuzzle = async (req, res) => {
    try {

        const puzzle = await Puzzle.findById(req.params.id);

        if (!puzzle) {
            return res.status(404).json({
                message: "Puzzle not found"
            });
        }

        res.json(puzzle);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: err.message
        });
    }
};
const getPuzzleByLevel = async (req, res) => {

    try {

        const puzzle = await Puzzle.findOne({
            level: req.params.level
        });

        if (!puzzle) {

            return res.status(404).json({
                message: "No puzzle found for this level"
            });

        }

        res.json(puzzle);

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};
const User = require("../models/User");

const addPuzzle = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);

        if (!user || user.email !== "fatimahimama09@gmail.com") {

            return res.status(403).json({
                message: "Access Denied"
            });

        }

        const puzzle = await Puzzle.create(req.body);

        res.status(201).json(puzzle);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};


const updatePuzzle = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);

        if (!user || user.email !== "fatimahimama09@gmail.com") {

            return res.status(403).json({
                message: "Access Denied"
            });

        }

        const puzzle = await Puzzle.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );

        if (!puzzle) {

            return res.status(404).json({
                message: "Puzzle not found"
            });

        }

        res.json(puzzle);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};



const deletePuzzle = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);

        if (!user || user.email !== "fatimahimama09@gmail.com") {

            return res.status(403).json({
                message: "Access Denied"
            });

        }

        const puzzle = await Puzzle.findByIdAndDelete(req.params.id);

        if (!puzzle) {

            return res.status(404).json({
                message: "Puzzle not found"
            });

        }

        res.json({
            message: "Puzzle deleted successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};


module.exports = {
    getPuzzles,
    getPuzzle,
    getPuzzleByLevel,
    solvePuzzle,
    addPuzzle,
    updatePuzzle,
    deletePuzzle
};
