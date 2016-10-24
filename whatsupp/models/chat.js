const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  names: { type: Array, required: true },
  personOneMessages: { type: Array, required: true },
  personTwoMessages: { type: Array, required: true }
}, {
  timestamps: true  
});

module.exports = mongoose.model("Chat", chatSchema);
