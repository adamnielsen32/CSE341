const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');


routes.get('/', lesson1Controller.madelineRoute);
routes.get('/everett', lesson1Controller.everettRoute);

module.exports = routes;
