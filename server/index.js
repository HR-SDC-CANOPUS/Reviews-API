const express = require('express');
const app = express();
const port = 3010;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./router');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/', router);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))