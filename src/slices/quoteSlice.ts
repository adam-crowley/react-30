import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchRandomQuote = createAsyncThunk(
  'quote/fetchRandom',
  async () => {
    const response = await axios.get(
      'http://localhost:3000/api/v1/quotes/random'
    )
    // const data = await response.json()
    return response
  }
)

const quoteSlice = createSlice({
  name: 'quote',
  initialState: {
    quote: null,
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomQuote.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchRandomQuote.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.quote = action.payload
      })
      .addCase(fetchRandomQuote.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
  reducers: undefined,
})

export default quoteSlice.reducer
