const jwt = require("jsonwebtoken");
const User = require("../models/user");
const registerUser = async (req, res) => {
  console.log("Inside register user", req.body);
  try {
    const user = new User(req.body);
    // const hashedPassword = await user.hashPassword(req.body.password);
    // user.password = hashedPassword;
    const token = jwt.sign(user.email, process.env.JWT_SECRET);
    const saveResponse = await user.save();
    return res.status(200).json({ msg: saveResponse.email, token });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ err: error });
  }
};

const loginUser = async (req, res) => {
  console.log("Inside loginuser", req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw "No user with given email found";
    console.log(user);
    const passwordVerification = await user.comparePassword(req.body.password);
    if (!passwordVerification)
      throw "Password do not match. Please check credentials.";
    delete user.password;
    let token = jwt.sign(user.email, process.env.JWT_SECRET);
    return res.status(200).json({ msg: user.email, token });
  } catch (error) {
    console.log(`Error in loginUser ${error}`);
    return res.status(400).json({ err: error || "Unexpected error" });
  }
};

const updateUser = async (req, res) => {
  console.log("Inside updateUser fn", req.body);
  try {
    let updatedUser = await User.findOneAndUpdate(
      { email: req.body.email },
      req.body
    );
    if (!updatedUser) throw "No user found/updated";
    return res.status(200).json({ msg: "User details updated" });
  } catch (error) {
    return res.status(400).json({ err: error || "Unexpected error" });
  }
};

const updatePassword = async (req, res) => {
  console.log("Inside updatePassword", req.body);
  try {
    let user = await User.findOneAndUpdate({ email: req.body.email });
    if (!user) throw "No user found with given email.";
    user.password = req.body.password;
    let updatePasswordResponse = await user.save();
    console.log(updatePasswordResponse);
    if (!updatePasswordResponse) throw "No user found/updated.";
    return res.status(200).json({ msg: "User password successfully updated" });
  } catch (error) {
    return res.status(400).json({ err: error || "Unexpected error" });
  }
};

const updateInterests = async (req, res) => {
  console.log("Inside updateInterests", req.body);
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) throw "No user found with given email";
    user.interests = req.body.interests;
    let updateInterestsResponse = await user.save();
    if (!updateInterestsResponse) throw "No user found/updated";
    return res.status(200).json({ msg: "Interests updated successfully" });
  } catch (error) {
    return res.status(400).json({ err: error || "Unexpected error" });
  }
};

const getFollowers = async (req, res) => {
  console.log("Inside getFollowers", req.query);
  try {
    let { page = 1, limit = 5, email } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    let user = await User.findOne({ email });
    if (!user) throw "No user found for given email";
    console.log((page - 1) * limit, (page - 1) * limit + limit);
    let followerList = user.followers.slice(
      (page - 1) * limit,
      (page - 1) * limit + limit
    );
    console.log(followerList);
    return res.status(200).json({ msg: followerList });
  } catch (error) {
    return res.status(400).json({ err: error || "Unexpected error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  updatePassword,
  updateInterests,
  getFollowers,
};
