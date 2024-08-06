import express from 'express'
const router = express.Router()

import Quotes from '../models/quotes'

// /quotes/list
router.get('/list', async (req, res) => {
  try {
    const quotesObject = await Quotes.find({})
    console.log('quotesObject', quotesObject)
    res.json({ result: quotesObject[0].quotes })
  } catch (error) {
    console.error('Error fetching quotes:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// /quotes/random
router.get('/random', async (req, res) => {
  try {
    const randomNumber = Math.floor(Math.random() * 21)
    const quotesObject = await Quotes.find({})
    const quoteItem = quotesObject[0].quotes[randomNumber]
    res.send(quoteItem)
  } catch (error) {
    console.error('Error fetching quotes:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
