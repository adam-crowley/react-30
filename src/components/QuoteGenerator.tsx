import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { RotatingTriangles } from 'react-loader-spinner'

function QuoteGenerator() {
  const [randomQuote, setRandomQuote] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  async function getData() {
    try {
      setIsLoading(true)
      const response = await axios.get(
        'http://localhost:3000/api/v1/quotes/random'
      )
      setIsLoading(false)
      setRandomQuote(response.data.quote)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="quote-generator">
      <h2>Quote Generator</h2>
      <div className="quote-generator__container">
        {isLoading ? (
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
                "{randomQuote}"
              </motion.blockquote>
            </AnimatePresence>
          </>
        )}
      </div>
      <button className="button button--yellow" onClick={getData}>
        Generate new quote
      </button>
    </div>
  )
}

export default QuoteGenerator
