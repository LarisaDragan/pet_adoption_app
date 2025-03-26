const bcrypt = require("bcrypt"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // import jwt to sign tokens
const User = require("../models/users");

const { SECRET = "secret" } = process.env;

//sign up (create a new user)
const signupUser = async (req, res) => {
  try {
    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // create a new user
    const { userName, password } = req.body;
    if (userName && password) {
      const user = await User.create(req.body);
      // send new user as response
      const token = jwt.sign(
        { userId: user._id, emailAddress: user.emailAddress },
        SECRET
      );

      res.status(200).json({ token, message: "Registration successful" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

// login user
const loginUser = async (req, res) => {
  // check if the user exists
  const user = await User.findOne({
    emailAddress: req.body.emailAddress,
  });

  if (user) {
    //check if password matches
    const result = await bcrypt.compare(req.body.password, user.password);
    if (result) {
      // sign token and send it in response
      const token = jwt.sign(
        { userId: user._id, emailAddress: user.emailAddress },
        SECRET
      );
      res.json({ token });
    } else {
      res.status(400).json({ error: "Password doesn't match" });
    }
  } else {
    res.status(400).json({ error: "User doesn't exist" });
  }
};

// const deleteAllUsers = (req, res) => {
//   User.deleteMany({})
//     .then(() => res.json({ message: "Success! All users deleted." }))
//     .catch((err) =>
//       res
//         .status(400)
//         .json({ message: "Failed to delete all users.", error: err.message })
//     );
// };

module.exports = {
  signupUser,
  loginUser,
  // deleteAllUsers,
};
