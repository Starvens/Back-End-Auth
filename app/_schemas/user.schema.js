const number = require("joi/lib/types/number");
const object = require("joi/lib/types/object");
const { ObjectId } = require("mongoose");
var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
    unique: true,
  },
  last_name: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  zipcode: {
    type: String,
    required: true,
    unique: true,
  },
  starvens_reference: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
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
  updated_at: {
    type: Date,
    required: false,
    default: null,
  },
});

module.exports = mongoose.model("user", UserSchema);
