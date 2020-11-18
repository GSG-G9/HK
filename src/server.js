const http = require('http');
const router = require('./router');

const port = process.env.PORT || 9000;
const server = http.createServer(router);
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running @ http://localhost:${port}`);
});
