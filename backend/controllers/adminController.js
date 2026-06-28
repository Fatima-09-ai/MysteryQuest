const Puzzle = require("../models/Puzzle");

const addPuzzle = async (req, res) => {

    try {

        const puzzle = await Puzzle.create(req.body);

        res.status(201).json(puzzle);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {
    addPuzzle
};