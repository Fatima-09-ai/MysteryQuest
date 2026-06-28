const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
    addPuzzle,
    updatePuzzle,
    deletePuzzle,
    getPuzzles
} = require("../controllers/puzzleController");

// GET ALL PUZZLES (ADMIN)
router.get("/puzzles", protect, admin, getPuzzles);

// ADD PUZZLE
router.post("/puzzles", protect, admin, addPuzzle);

// UPDATE PUZZLE
router.put("/puzzles/:id", protect, admin, updatePuzzle);

// DELETE PUZZLE
router.delete("/puzzles/:id", protect, admin, deletePuzzle);

module.exports = router;