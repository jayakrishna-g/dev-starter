const express = require('express');
const homebrewController = require('../controllers/homebrewController');

const homebrewRouter = express.Router();

homebrewRouter.get('/scrap', homebrewController.homebrewController);

module.exports = homebrewRouter;
