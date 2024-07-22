import express from 'express'

import { getAllQuotes, getRandomQuote } from './db'
import { getCollection } from './connection'

const router = express.Router()

// /quotes/list
router.get('/list', async (req, res) => {
  try {
    const quotesCollection = await getCollection()
    const quotesArr = await getAllQuotes(quotesCollection)
    const quotes = quotesArr.map((item) => item.quote)
    res.json({ quotes })
  } catch (error) {
    console.error('Error fetching quotes:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// /quotes/random
router.get('/random', async (req, res) => {
  try {
    const quotesCollection = await getCollection()
    const quote = await getRandomQuote(quotesCollection)
    res.json({ quote })
  } catch (error) {
    console.error('Error fetching quotes:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
