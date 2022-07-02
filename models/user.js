const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const AuthorizationError = require('../utils/errors/authorization-error');

const userSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      type: String,
      unique: true,
      index: true,
    },
    password: {
      required: true,
      type: String,
      select: false,
    },
    name: {
      minlength: 2,
      maxlength: 30,
      type: String,
      default: "Жак-Ив Кусто",
    },
    about: {
      minlength: 2,
      maxlength: 30,
      type: String,
      default: "Исследователь",
    },
    avatar: {
      type: String,
      default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthorizationError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model("user", userSchema);
