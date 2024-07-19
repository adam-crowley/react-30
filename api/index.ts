import express from 'express'
import { MongoClient } from 'mongodb'
import { config } from 'dotenv'
import bodyParser from 'body-parser'
import { join } from 'path'
import cors from 'cors'

import quotes from '../public/data/quotes.json'
import quotesRoute from './routes'

const app = express()
const port = process.env.PORT || 3000

config()
console.log('process.env.DB_CONNECTION_URL', process.env.DB_CONNECTION_URL)
executeCrudOperations()

export async function connectToCluster(uri) {
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

export async function executeCrudOperations() {
  const uri = process.env.DB_CONNECTION_URL
  let mongoClient

  try {
    mongoClient = await connectToCluster(uri)
    const db = mongoClient.db('react_30')
    const collection = db.collection('quotes')
  } finally {
    await mongoClient.close()
  }
}

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.static(join(__dirname, './public')))

app.use('/quotes', quotesRoute)

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.get('/quotesList', (req, res) => {
  res.send({ quotesList: quotes })
})

app.get('/randomQuote', (req, res) => {
  const randomNumber = Math.floor(Math.random() * 21)
  const quoteItem = quotes[randomNumber]
  res.send(quoteItem)
})

app.listen(port, () => {
  console.log('Listening on port', port)
})

export default app
