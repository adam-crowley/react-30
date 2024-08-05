import { Collection, MongoClient } from 'mongodb'

let mongoClient: MongoClient
let mongoCollection: Collection

export async function connectToCluster(uri: string) {
  try {
    mongoClient = new MongoClient(uri)
    console.log('Connecting to MongoDB Atlas cluster...')
    await mongoClient.connect()
    console.log('Successfully connected to MongoDB Atlas')
  } catch (error) {
    console.error('Connection to MongoDB Atlas failed', error)
    process.exit(1)
  }
}

export async function getCollection(database: string, collection: string) {
  const uri: string | undefined = process.env.CLUSTER_CONNECTION_URL
  if (!uri) {
    throw new Error('DB_CONNECTION_URL is not defined in environment variables')
  }
  if (!mongoClient) {
    await connectToCluster(uri)
  }
  if (!mongoCollection) {
    const db = mongoClient.db(database)
    mongoCollection = db.collection(collection)
  }
  return mongoCollection
}
