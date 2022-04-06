var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    required: true,
    default: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  created_by: {
    type: ObjectId,
    required: false,
  },
  updated_at: {
    type: Date,
    required: false,
    default: null,
  },
  updated_by: {
    type: ObjectId,
    required: false,
    default: null,
  },
});

module.exports = mongoose.model("employee", EmployeeSchema);
