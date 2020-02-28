require("dotenv").config();

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const Users = require("../models/users-model");

router.post("/register", (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    res
      .status(400)
      .json({ message: "Registration requires a username and password" });
  }

  const hash = bcrypt.hashSync(password, 10);
  password = hash;

  Users.add({ username, password })
    .then(saved => {
      const token = generateToken({ username });
      delete saved.password;
      res.status(201).json({ ...saved, token });
    })
    .catch(error => res.status(500).json({ message: "Internal Server Error" }));
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Login requires a username and password" });
  }

  try {
    let user = await Users.findByUsername(username);

    if (user && bcrypt.compareSync(password, user.password)) {
      delete user.password;
      const token = generateToken({ username });
      res.status(200).json({ ...user, token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
