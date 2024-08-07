import express from 'express'
const router = express.Router()

import Quotes from '../models/quotes'

// /api/v1/quotes/list
router.get('/list', async (req, res) => {
  try {
    const quotes = await Quotes.find().select('quote')
    res.json(quotes)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// /api/v1/quotes/random
router.get('/random', async (req, res) => {
  try {
    const quotes = await Quotes.find().select('quote')
    const randomNumber = Math.floor(Math.random() * quotes.length)
    const quoteObject = quotes[randomNumber]
    res.json(quoteObject)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
