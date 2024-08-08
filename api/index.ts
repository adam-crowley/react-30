import express from 'express'
import dotenv from 'dotenv'
import { join } from 'path'
import cors from 'cors'

import connectToMongoDB from './connection'
import quotes from './routes/quotes'
import auth from './routes/auth'
import posts from './routes/posts'

const server = express()
const port = process.env.PORT || 3000

dotenv.config()

connectToMongoDB()

server.use(cors())
server.use(express.json())
server.use(express.static(join(__dirname, './public')))

server.use('/api/v1/quotes', quotes)

server.use('/api/v1/user', auth)
server.use('/api/v1/posts', posts)

server.get('/', (req, res) => {
  res.send('Hello world!')
})

server.listen(port, () => {
  console.log('Listening on port', port)
})

export default server
