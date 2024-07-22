import { Collection, Document } from 'mongodb'

export async function getAllQuotes(collection: Collection<Document>) {
  try {
    const quotes = await collection.find({}).toArray()
    return quotes
  } catch (error) {
    console.error('Error fetching quotes', error)
    throw error
  }
}

export async function getRandomQuote(collection: Collection<Document>) {
  try {
    const quotes = await collection.find({}).toArray()
    const randomNumber = Math.floor(Math.random() * quotes.length)
    return quotes[randomNumber].quote
  } catch (error) {
    console.error('Error fetching quote', error)
    throw error
  }
}
