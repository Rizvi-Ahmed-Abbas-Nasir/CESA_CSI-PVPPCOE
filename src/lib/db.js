import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;
console.log('MongoDB URI:', MONGO_URI); // Log the URI for debugging

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

let cachedClient = global.mongoose;

if (!cachedClient) {
  cachedClient = global.mongoose = { conn: null, promise: null };
}

async function connectMongoDB() {

  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB Cluster URI:', MONGO_URI);

    // List collections in the connected database
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('Collections in the database:', collections.map(c => c.name));
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
  if (cachedClient.conn) {
    console.log('Using cached MongoDB connection'); // Debug log for cached connection
    return cachedClient.conn;
  }

  if (!cachedClient.promise) {
    console.log('Creating new MongoDB connection...'); // Debug log for new connection attempt

    cachedClient.promise = mongoose.connect(MONGO_URI)
      .then((mongoose) => {
        console.log('Successfully connected to MongoDB'); // Log success
        return mongoose;
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error); // Log failure
        throw error; // Ensure the error is thrown after logging
      });
  }

  try {
    cachedClient.conn = await cachedClient.promise;
    return cachedClient.conn;
  } catch (error) {
    console.error('Failed to connect to MongoDB after promise:', error); // Additional debug in case of failure
    throw error;
  }
}



export default connectMongoDB;
