const chocoService = require('../services/chocoService');

const chocoScrappingController = async (req,res) => {
    try {
      const data = await chocoService.chocoScrappingService();
      res.status(200).json(data);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  
  module.exports = {
    chocoScrappingController,
  };