import express from 'express'
const router = express.Router()

import { getAllQuotes, getRandomQuote } from '../db'
import { getCollection } from '../connection'

// /quotes/list
router.get('/list', async (req, res) => {
  try {
    const quotesCollection = await getCollection('react_30', 'quotes')
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
    const quotesCollection = await getCollection('react_30', 'quotes')
    const quote = await getRandomQuote(quotesCollection)
    res.json({ quote })
  } catch (error) {
    console.error('Error fetching quotes:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
