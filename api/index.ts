import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { join } from 'path'
import cors from 'cors'

import quotes from './routes/quotes'
import userAuthentication from './routes/userAuthentication'

const server = express()
const port = process.env.PORT || 3000

dotenv.config()

async function connectToDatabase() {
  try {
    const conn = await mongoose.connect(process.env.DB_CONNECTION_URL!)
    console.log(`Connected to MongoDB: ${conn.connection.host}`)
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
  }
}

connectToDatabase()

server.use(cors())
server.use(express.json())
server.use(express.static(join(__dirname, './public')))
server.use(bodyParser.json())

server.use('/api/v1/quotes', quotes)
server.use('/api/v1/user-authentication', userAuthentication)

server.get('/', (req, res) => {
  res.send('Hello world!')
})

server.listen(port, () => {
  console.log('Listening on port', port)
})

export default server
