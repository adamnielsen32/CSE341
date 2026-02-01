require('dotenv').config();

const express = require('express');
const app = express();
const { initDb } = require('./db/connect');

const port = 3000;

app 
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Z-Key');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    });


app.use(express.json());
app.use('/', require('./routes'));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
 app.use('/contacts', require('./routes/contacts'));

initDb()
  .then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
    })
    .catch((err) => {
        console.error('Failed to initialize database', err);
    });

   



