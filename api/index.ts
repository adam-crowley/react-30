import express from 'express'
import { join } from 'path'
import cors from 'cors'

// import quotes from '../public/data/quotes.json'

const app = express()
const port = process.env.PORT || 3000

app.use(
  cors({
    origin: '*',
    methods: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    allowedHeaders:
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    credentials: true,
  })
)

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world!')
})

// app.get('/quotesList', (req, res) => {
//   res.send({ quotesList: quotes })
// })

app.use(express.static(join(__dirname, './public')))

app.listen(port, () => {
  console.log('Listening on port', port)
})

export default app
