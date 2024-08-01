const axios = require('axios');
const DataBase = require('../utils/database');

const homebrewService = async () => {
  let allPackages = [];

  try {
    const url = `https://formulae.brew.sh/api/formula.json`;
    const response = await axios.get(url, { timeout: 60000 });
    const packages = [];
    const data = response.data;
    for(let i=0;i<data.length;i++){
        packages.push({
            packageName: data[i].name,
            installCommand: "brew install "+data[i].name,
          });
    }
    if (packages.length > 0) {
        const collection = DataBase.ConnectToCollection('homebrew');
        await collection.insertMany(packages);
        console.log(`Inserted ${packages.length} packages into collection`);
      }
    return data;
  } catch (error) {
    console.error(`An error occurred while fetching the page: ${error.message}`);
  }
  
  console.log(`Total packages collected: ${allPackages.length}`);
  return allPackages;
};

module.exports = {
    homebrewService,
};
