var AWS = require("aws-sdk");

console.log("top of file");
console.log(AWS.config.getCredentials);
AWS.config.getCredentials(err => {
  console.log("starting?");
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
    console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
  }
});

AWS.getCredentials();
console.log("end of test");
