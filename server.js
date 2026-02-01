require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const { initDb } = require('./db/connect');

const port = process.env.PORT || 3000;

// CORS (frontend)
app.use(cors({
  origin: [
    'https://cse341-contacts-frontend.netlify.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/contacts', require('./routes/contacts'));

// Root (for Render sanity + graders)
app.get('/', (req, res) => {
  res.send('Contacts API is running');
});

// DB + Server
initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database', err);
  });
