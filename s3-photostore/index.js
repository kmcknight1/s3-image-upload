const server = require("./api/server");

const port = process.env.PORT || 6666;
server.listen(port, () => console.log(`\n**** RUNNING ON PORT ${port} ****\n`));
