const express = require('express');
const app = express();
const port = 3000;

app.use('/', (req, res) => {
  res.send('HELLO WORLD')
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))

