import mongoose from 'mongoose'

async function connectToMongoDB() {
  try {
    const conn = await mongoose.connect(process.env.DB_CONNECTION_URL!)
    console.log(`Connected to MongoDB: ${conn.connection.host}`)
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
  }
}

export default connectToMongoDB
