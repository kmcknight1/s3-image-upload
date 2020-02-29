const server = require("./api/server");

const port = process.env.PORT || 8888;
server.listen(port, () => console.log(`\n**** RUNNING ON PORT ${port} ****\n`));
