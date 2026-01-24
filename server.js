require('dotenv').config();

const express = require('express');
const app = express();
const { initDb } = require('./db/connect');

const port = 3000;

app.use(express.json());
app.use('/', require('./routes'));

initDb()
  .then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
    })
    .catch((err) => {
        console.error('Failed to initialize database', err);
    });

    app.use('/contacts', require('./routes/contacts'));
