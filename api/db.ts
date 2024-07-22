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
