const express = require('express');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 4000;

routes(app)

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
    console.log('http://localhost:'+port);
});

module.exports = app;