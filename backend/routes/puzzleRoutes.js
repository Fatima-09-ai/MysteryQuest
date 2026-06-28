const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");



const {
    getPuzzles,
    getPuzzle,
    getPuzzleByLevel,
    solvePuzzle,
    addPuzzle,
    updatePuzzle,
    deletePuzzle
} = require("../controllers/puzzleController");

router.get("/", getPuzzles);
router.get("/level/:level", getPuzzleByLevel);
router.get("/:id", getPuzzle);
router.post("/:id/solve", protect, solvePuzzle);
router.post("/", protect, addPuzzle);

router.put("/:id", protect, updatePuzzle);

router.delete("/:id", protect, deletePuzzle);


module.exports = router;