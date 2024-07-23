import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { join } from 'path'
import cors from 'cors'

import quotesRoute from './routes'

const server = express()
const port = process.env.PORT || 3000

dotenv.config()

server.use(cors())
server.use(bodyParser.json())
server.use(express.json())
server.use(express.static(join(__dirname, './public')))

server.use('/api/v1/quotes', quotesRoute)

server.get('/', (req, res) => {
  res.send('Hello world!')
})

server.listen(port, () => {
  console.log('Listening on port', port)
})

export default server
