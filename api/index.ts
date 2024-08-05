import express from 'express'
import dotenv from 'dotenv'
import { join } from 'path'
import cors from 'cors'

import quotes from './routes/quotes'
import userAuthentication from './routes/userAuthentication'

const server = express()
const port = process.env.PORT || 3000

dotenv.config()

server.use(cors())
server.use(express.json())
server.use(express.static(join(__dirname, './public')))

server.use('/api/v1/quotes', quotes)
server.use('/api/v1/user-authentication', userAuthentication)

server.get('/', (req, res) => {
  res.send('Hello world!')
})

server.listen(port, () => {
  console.log('Listening on port', port)
})

export default server
