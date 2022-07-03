const mongoose = require('mongoose');
const validateURL = require('../utils/validateURL/validateURL');

const cardSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      minlength: 2,
      maxlength: 30,
      type: String,
    },
    link: {
      required: true,
      type: String,
      validate: validateURL,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: [],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('card', cardSchema);
