import Quotes from '../models/Quotes'
import { router } from './routes'

router.post('/add', async (req, res) => {
  const quotesObject = new Quotes({
    quotes: req.body.quotes,
  })
  try {
    quotesObject.save((error, response) => {
      if (error) {
        console.log('error', error)
      } else {
        console.log('saved', response)
      }
    })
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Error in Saving')
  }
  res.status(200).json({
    response: 'success',
  })
})
