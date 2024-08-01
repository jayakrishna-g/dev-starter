const homebrewService = require('../services/homebrewService');

const homebrewController = async (req,res) => {
    try {
      const data = await homebrewService.homebrewService();
      res.status(200).json(data);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  
  module.exports = {
    homebrewController,
  };