const { model, Schema } = require("mongoose");

const questionSchema = new Schema({
  question: {
    type: String,
    require: true,
  },
  answer: {
    type: Number,
    require: true,
  },
  options: {
    type: Array,
    require: true,
  },
  level: {
    type: Number,
    required: true,
  },
});

module.exports = model("Question", questionSchema);
