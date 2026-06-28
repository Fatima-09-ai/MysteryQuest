const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
  username: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  points: {
    type: Number,
    default: 0
  },
  isAdmin: {
    type: Boolean,
    default: false
},

  currentLevel: {
    type: Number,
    default: 1
  },

 achievements: {
    type: [String],
    default: []
},

completedPuzzles: {
    type: Number,
    default: 0
},

  role: {
    type: String,
    default: "user"
  }
},
{
  timestamps: true
});


module.exports = mongoose.model("User", userSchema);