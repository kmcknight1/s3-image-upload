const router = require("express").Router();

const Users = require("../helpers/users-helper");

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      users.forEach(user => {
        delete user.password;
      });
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/:id", validateById, (req, res) => {
  delete req.user.password;

  res.status(200).json(req.user);
});

router.put("/:id", validateById, (req, res) => {
  const changes = req.body;

  if (changes.id) {
    res.status(400).json({ message: "User id cannot be changed" });
  } else {
    Users.update(changes, req.user.id)
      .then(changedUser => {
        delete changedUser.password;
        res.status(200).json(changedUser);
      })
      .catch(err => {
        console.log("in the endpoint");
        res.status(500).json({ message: "Internal server error" });
      });
  }
});

async function validateById(req, res, next) {
  const { id } = req.params;
  console.log(id);

  try {
    const user = await Users.find(id);

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: "User with that id does not exist" });
    }
  } catch (err) {
    console.log("in the validate function");
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = router;
