const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables FIRST
dotenv.config();

console.log("JWT_SECRET =", process.env.JWT_SECRET);

const connectDB = require("./config/db");

connectDB();

const app = express();


app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Mystery Quest API Running");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/puzzles", require("./routes/puzzleRoutes"));
app.use("/api/leaderboard", require("./routes/leaderboardRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});