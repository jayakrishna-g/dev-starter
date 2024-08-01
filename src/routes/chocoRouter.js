const express = require('express');
const chocoController = require('../controllers/chocoController');

const chocoRouter = express.Router();

chocoRouter.get('/scrap', chocoController.chocoScrappingController);

module.exports = chocoRouter;
