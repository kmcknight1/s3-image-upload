const router = require("express").Router();

const Contacts = require("../helpers/contacts-helper");

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Contacts.findByUserId(id)
    .then(contacts => {
      res.status(200).json(contacts);
    })
    .catch(err => {
      res.status(500).json({ message: "Internal server error" });
    });
});

router.post("/send-request", async (req, res) => {
  const { sender_id, receiver_id } = req.body;

  Contacts.sendRequest(sender_id, receiver_id)
    .then(request => {
      res.status(201).json(request);
    })
    .catch(err => {
      res.status(500).json({ message: "Internal server error" });
    });
});

router.put("/accept-request", (req, res) => {
  const { sender_id, receiver_id } = req.body;

  Contacts.acceptRequest(sender_id, receiver_id)
    .then(request => {
      res.status(200).json(request);
    })
    .catch(err => {
      res.status(500).json({ message: "Internal server error" });
    });
});

module.exports = router;
