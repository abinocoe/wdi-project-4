const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  personOne: { type: Array, required: true },
  personTwo: { type: Array, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model("Analysis", analysisSchema);
