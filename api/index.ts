import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { join } from 'path'
import cors from 'cors'

import quotesRoute from './routes'

const app = express()
const port = process.env.PORT || 3000

dotenv.config()

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.static(join(__dirname, './public')))

app.use('/quotes', quotesRoute)

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.listen(port, () => {
  console.log('Listening on port', port)
})

export default app
