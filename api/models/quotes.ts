import mongoose from 'mongoose'

const QuotesSchema = new mongoose.Schema({
  quotes: {
    type: Array,
    required: true,
  },
})

export default mongoose.model('Quotes', QuotesSchema)
