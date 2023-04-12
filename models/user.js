const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      //   unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
    },
    age: {
      type: Number,
    },
    interests: {
      type: Array,
    },
    followers: {
      type: Array,
    },
  },
  { timestamps: true }
);

User.pre("save", async function (next) {
  //if the password field is not the one being modified, do not hash
  if (!this.isModified("password")) return next();
  let hashedPassword = await bycrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

User.methods.comparePassword = async function (plaintextPassword) {
  let passwordVerification = await bycrypt.compare(
    plaintextPassword,
    this.password
  );
  return passwordVerification;
};

module.exports = mongoose.model("User", User);
