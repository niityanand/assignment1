const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  age: Number,
  batch: String,
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
