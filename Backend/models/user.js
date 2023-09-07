const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  noteTitle: { type: String, required: true },
  noteSubject: { type: String, required: true },
  note: { type: String, required: true },
  noteDate: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  notes: [noteSchema],
});

module.exports = mongoose.model("User", userSchema);
