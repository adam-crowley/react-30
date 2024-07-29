import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotatingTriangles } from 'react-loader-spinner'

import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchRandomQuote } from '../slices/quoteSlice'

function QuoteGenerator() {
  const dispatch = useAppDispatch()
  const quote = useAppSelector((state) => state.quote)
  const status = useAppSelector((state) => state.status)

  useEffect(() => {
    dispatch(fetchRandomQuote())
  }, [dispatch])

  function handleFetchQuote() {
    dispatch(fetchRandomQuote())
  }

  return (
    <div className="quote-generator">
      <h2>Quote Generator</h2>
      <div className="quote-generator__container">
        {status === 'loading' ? (
          <RotatingTriangles
            visible={true}
            height="80"
            width="80"
            colors={[
              'rgb(255, 204, 102)',
              'rgb(0, 187, 255)',
              'rgb(187, 136, 255)',
            ]}
            ariaLabel="rotating-triangles-loading"
            wrapperStyle={{}}
            wrapperClass="quote-generator__loading"
          />
        ) : (
          <>
            <AnimatePresence>
              <motion.blockquote
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: 'easeInOut', duration: 0.4 }}
                className="quote-generator__blockquote"
              >
                "{quote}"
              </motion.blockquote>
            </AnimatePresence>
          </>
        )}
      </div>
      <button className="button button--yellow" onClick={handleFetchQuote}>
        Generate new quote
      </button>
    </div>
  )
}

export default QuoteGenerator
