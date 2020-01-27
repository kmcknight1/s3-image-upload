const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { image_upload, text_upload } = require("./image_upload");

const singleUpload = image_upload.single("image");

const server = express();

const middlewareConfig = [helmet(), express.json(), morgan("combined")];

server.use(middlewareConfig);

server.get("/", (_, res) => {
  res.send("HELLO YOU'VE MADE A SERVER");
});

server.post("/image-upload", (req, res) => {
  console.log("REQUEST", req);
  console.log("image_upload", image_upload.single("image"));

  singleUpload(req, res, function(err) {
    if (err) {
      console.log(err.message);
      return res.status(422).send({
        errors: [{ title: "Image Upload Error", detail: err.message }]
      });
    } else {
      return res.send("SUCCESS");
    }
  });
});

server.post("/text-upload", text_upload, (req, res) => {
  console.log("UPLOAD RESPONSE: ", req.uploadRes);
  res.status(200).json({ message: "SUCCESS" });
});

server.listen(6666, () => console.log(`\n**** RUNNING ON PORT 6666 ****\n`));
