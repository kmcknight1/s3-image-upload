const aws = require("aws-sdk");
const multer = require("multer");
const multers3 = require("multer-s3");

const bucketName = `photostore-8944682a-ecf0-42bd-bbdd-e0d58049f34d`;

var credentials = new aws.SharedIniFileCredentials({ profile: "henry" });
aws.config.credentials = credentials;

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  console.log("in fileFilter");
  console.log("file:", file);
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

const image_upload = multer({
  fileFilter,
  storage: multers3({
    acl: "public-read",
    s3,
    bucket: bucketName,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: "PHOTOSTORE_TESTING_METADATA" });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    }
  })
});

const text_upload = (req, res, next) => {
  console.log("beginning text upload");
  const uploadPromise = s3
    .putObject({
      Bucket: bucketName,
      Key: Date.now().toString(),
      Body: req.body.text
    })
    .promise();

  uploadPromise
    .then(res => {
      console.log("in the .then of text upload");
      console.log("req.body", req.body);
      req.uploadRes = res;
      next();
    })
    .catch(err =>
      res
        .status(400)
        .json({ error: "failed to upload text", detail: JSON.stringify(err) })
    );
};

module.exports = { image_upload, text_upload };

// const bucketPromise = new aws.S3()
//   .createBucket({ Bucket: bucketName })
//   .promise();
// const keyName = "testing123";

// bucketPromise
//   .then(data => {
//     const objectParams = { Bucket: bucketName, Key: keyName, Body: "hello" };
//     const uploadPromise = new aws.S3().putObject(objectParams).promise();

//     uploadPromise.then(data => {
//       console.log("SUCCESSSSS");
//     });
//   })
//   .catch(err => {
//     console.error(err, err.stack);
//   });
