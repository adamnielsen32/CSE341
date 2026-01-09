const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Madeline Nielsen');
});

const port = 3000;

app.listen(process.env.PORT || port);
console.log('Server is listening at port ' + (process.env.PORT || port));