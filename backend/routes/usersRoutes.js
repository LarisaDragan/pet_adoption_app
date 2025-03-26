const router = require("express").Router();
const { signupUser, loginUser } = require("../controllers/userController");

/**
 * Method: POST
 * Sign up
 */
router.post("/signup", signupUser);

/**
 * Method: POST
 * Login
 */
router.post("/login", loginUser);

module.exports = router;
