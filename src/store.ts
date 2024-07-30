import { configureStore } from '@reduxjs/toolkit'

import quoteReducer from './slices/quoteSlice'

const store = configureStore({
  reducer: quoteReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
