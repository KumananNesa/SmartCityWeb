const http = require('http');

const app = require('./app.js'); // import de app


const server = http.createServer(app);



// set port, listen for requests

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });


module.exports = app;