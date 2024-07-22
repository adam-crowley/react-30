import { MongoClient } from 'mongodb'

export async function connectToCluster(uri: string) {
  let mongoClient
  try {
    mongoClient = new MongoClient(uri)
    console.log('Connecting to MongoDB Atlas cluster...')
    await mongoClient.connect()
    console.log('Successfully connected to MongoDB Atlas!')
    return mongoClient
  } catch (error) {
    console.error('Connection to MongoDB Atlas failed!', error)
    process.exit()
  }
}

export async function getCollection() {
  const uri: string | undefined = process.env.DB_CONNECTION_URL
  if (!uri) {
    throw new Error('DB_CONNECTION_URL is not defined in environment variables')
  }
  let mongoClient

  try {
    mongoClient = await connectToCluster(uri)
    const db = mongoClient.db('react_30')
    const collection = db.collection('quotes')
    return collection
  } finally {
    await mongoClient.close()
  }
}
