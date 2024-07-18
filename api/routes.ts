import express from 'express'

import Quotes from '../models/Quotes'

const router = express.Router()

// /quotes/add
router.post('/add', async (req, res) => {
  const quotesObject = new Quotes({
    quotes: req.body.quotes,
  })
  try {
    await quotesObject.save()
    res.status(200).json({
      response: 'success',
    })
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      res.status(500).send('Error in Saving')
    }
  }
})

// /quotes/list
router.get('/list', async (req, res) => {
  const quotesObject = await Quotes.find({})
  res.json({ result: quotesObject[0].quotes })
})

router.get('/random', async (req, res) => {
  const randomNumber = Math.floor(Math.random() * 21)
  const quotesObject = await Quotes.find({})
  const quoteItem = quotesObject[0].quotes[randomNumber]
  res.send(quoteItem)
})

export default router
