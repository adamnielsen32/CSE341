const { MongoClient } = require('mongodb');

let database;

const initDb = async () => {
  if (database) {
    return database;
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  database = client.db();
  console.log('Connected to MongoDB');
  return database;
};

const getDb = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }
  return database;
};

module.exports = { initDb, getDb };
