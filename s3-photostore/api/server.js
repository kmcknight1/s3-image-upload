const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const { image_upload, text_upload } = require("./image_upload");

const authRouter = require("./routers/authRouter");
const usersRouter = require("./routers/usersRouter");

const singleUpload = image_upload.single("image");

const server = express();

const middlewareConfig = [helmet(), express.json(), morgan("combined"), cors()];

server.use(middlewareConfig);

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (_, res) => {
  res.send(`<h1>Server is up and running :)</h1>`);
});

server.post("/image-upload", (req, res) => {
  singleUpload(req, res, function(err) {
    if (err) {
      console.log(err.message);
      return res.status(422).send({
        errors: [{ title: "Image Upload Error", detail: err.message }]
      });
    } else {
      console.log("REQ.FILE>>>>>>>>>>>>>>", req.file);
      return res.json({ message: "SUCCESS", url: req.file.location });
    }
  });
});

server.post("/text-upload", text_upload, (req, res) => {
  console.log("UPLOAD RESPONSE: ", req.uploadRes);
  res.status(200).json({ message: "SUCCESS" });
});

module.exports = server;
