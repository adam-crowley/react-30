import mongoose, { Connection } from 'mongoose'

let mongoConnection: Connection

export async function connectToCluster(uri: string, database: string) {
  try {
    const fullUri = `${uri}/${database}`
    console.log('Connecting to MongoDB Atlas cluster...')
    await mongoose.connect(fullUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    mongoConnection = mongoose.connection
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
  if (!mongoConnection || !mongoConnection.readyState) {
    await connectToCluster(uri, database)
  }

  if (!mongoConnection.db) {
    throw new Error('Failed to connect to the database.')
  }

  return mongoConnection.db.collection(collection)
}
