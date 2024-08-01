const mongoClient = require('mongodb').MongoClient;
class DataBase {
  constructor() {}

  static GetDB() {
    if (typeof DataBase.mongo === 'undefined') {
      DataBase.InitDB();
    }
    return DataBase.mongo;
  }

  static InitDB(app) {
    const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
  
    console.log(`> Connecting to mongoDB @ ${url}`);
    mongoClient.connect(url, {
      // Remove useUnifiedTopology option
    })
      .then(client => {
        if (!client) {
          console.log('> Failed to connect mongoDB -  no client');
          process.exit();
        } else {
          console.log('> Connected');
          DataBase.mongo = client;
          if (app) app.emit('connected To Database');
        }
      })
      .catch(err => {
        console.log(`> Failed to connect mongoDB - ${err}`);
        process.exit();
      });
  }


  static ConnectToCollection(collectionName) {
    return this.GetDB().db(process.env.MONGO_DATABASE).collection(collectionName);
  }

  static Disconnect () {
    return this.GetDB().close();
  }
}

module.exports = DataBase;