import { Collection, MongoClient } from 'mongodb'

let mongoClient: MongoClient
let quotesCollection: Collection

export async function connectToCluster(uri: string) {
  try {
    mongoClient = new MongoClient(uri)
    console.log('Connecting to MongoDB Atlas cluster...')
    await mongoClient.connect()
    console.log('Successfully connected to MongoDB Atlas!')
  } catch (error) {
    console.error('Connection to MongoDB Atlas failed!', error)
    process.exit(1)
  }
}

export async function getCollection() {
  const uri: string | undefined = process.env.DB_CONNECTION_URL
  if (!uri) {
    throw new Error('DB_CONNECTION_URL is not defined in environment variables')
  }
  if (!mongoClient) {
    await connectToCluster(uri)
  }
  if (!quotesCollection) {
    const db = mongoClient.db('react_30')
    quotesCollection = db.collection('quotes')
  }
  return quotesCollection
}
