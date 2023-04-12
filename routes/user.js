const {
  registerUser,
  loginUser,
  updateUser,
  updatePassword,
  updateInterests,
  getFollowers,
} = require("../controllers/user");

const router = require("express").Router();

router.post("/user/registerUser", registerUser);
router.post("/user/loginUser", loginUser);
router.post("/user/updateUser", updateUser);
router.post("/user/updatePassword", updatePassword);
router.post("/user/updateInterests", updateInterests);
router.get("/user/getFollowers", getFollowers);

module.exports = router;
