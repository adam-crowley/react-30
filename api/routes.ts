import express from 'express'

import { getAllQuotes } from './db'
import { getCollection } from './connection'

const router = express.Router()

// /quotes/list
router.get('/list', async (req, res) => {
  const quotesCollection = await getCollection()
  // const quotesArr = await getAllQuotes(quotesCollection)
  console.log('quotesCollection', quotesCollection)
  // console.log('quotesArr', quotesArr)
  // res.json(quotesCollection)
  // const quotesObject = await Quotes.find({})
  // res.json({ result: quotesObject[0].quotes })
})

export default router
