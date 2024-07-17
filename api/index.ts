import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { join } from 'path'
import cors from 'cors'

import quotes from '../public/data/quotes.json'

const app = express()
const port = process.env.PORT || 3000

dotenv.config()

mongoose.connect(process.env.DB_CONNECTION_URL).then(
  () => {
    console.log('Connected to MongoDB')
  },
  (error) => {
    console.error('Failed to connect to MongoDB', error)
    process.exit(1)
  }
)

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

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

app.use(express.static(join(__dirname, './public')))

app.listen(port, () => {
  console.log('Listening on port', port)
})

export default app
