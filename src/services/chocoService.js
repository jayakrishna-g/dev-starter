const axios = require('axios');
const cheerio = require('cheerio');
const DataBase = require('../utils/database');

const chocoScrappingService = async () => {
  let allPackages = [];

  try {
    for (let i = 1; ; i++) {
      const url = `https://community.chocolatey.org/packages?sortOrder=package-download-count&page=${i}&prerelease=False&moderatorQueue=False&moderationStatus=all-statuses`;
      const response = await axios.get(url, { timeout: 60000 });

      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);
        
        // Example of extracting data from the page
        const packages = [];
        $('li').each((index, element) => {
          const imageSrc = 'https://community.chocolatey.org'+$(element).find('img').attr('src');
          const packageAnchor = $(element).find('a.h5.fw-bold');
          const packageName = packageAnchor.contents().filter(function() {
            return this.nodeType === 3;
          }).text().trim();
          const installCommand = $(element).find('input').val();
  
          if (imageSrc && packageName && installCommand) {
            packages.push({
              imageSrc: imageSrc,
              packageName: packageName,
              installCommand: installCommand,
            });
          }
        });
  
        console.log(JSON.stringify(packages, null, 2));
        console.log(`Number of packages on page ${i}: ${packages.length}`);
        allPackages = allPackages.concat(packages);
        if (allPackages.length > 0) {
          const collection = DataBase.ConnectToCollection('chocolatey');
          await collection.insertMany(packages);
          console.log(`Inserted ${packages.length} packages into collection`);
        }
      } else {
        console.error(`Failed to fetch page ${i}. Status code: ${response.status}`);
      }
    }
  } catch (error) {
    console.error(`An error occurred while fetching the page: ${error.message}`);
  }
  
  console.log(`Total packages collected: ${allPackages.length}`);
  return allPackages;
};

module.exports = {
  chocoScrappingService,
};
